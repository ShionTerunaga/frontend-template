import { readFileSync } from "node:fs";

type ReleaseResponse = {
  id: number;
};

const token = process.env.GITHUB_TOKEN;
const repository = process.env.GITHUB_REPOSITORY;
const targetCommitish = process.env.GITHUB_SHA;
const notesPath = process.env.NOTES_PATH;
const tagName = process.env.TAG_NAME;
const releaseName = process.env.RELEASE_NAME;

if (!token) {
  throw new Error("GITHUB_TOKEN is required.");
}

if (!repository) {
  throw new Error("GITHUB_REPOSITORY is required.");
}

if (!targetCommitish) {
  throw new Error("GITHUB_SHA is required.");
}

if (!notesPath || !tagName || !releaseName) {
  throw new Error("NOTES_PATH, TAG_NAME, and RELEASE_NAME are required.");
}

const [owner, repo] = repository.split("/");

if (!owner || !repo) {
  throw new Error(`Invalid GITHUB_REPOSITORY: ${repository}`);
}

const body = readFileSync(notesPath, "utf8");

async function githubRequest<T>(
  path: string,
  init: RequestInit = {},
): Promise<{ status: number; data: T | null }> {
  const response = await fetch(`https://api.github.com${path}`, {
    ...init,
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "X-GitHub-Api-Version": "2022-11-28",
      ...(init.headers ?? {}),
    },
  });

  if (response.status === 204) {
    return { status: response.status, data: null };
  }

  const text = await response.text();
  const data = text ? (JSON.parse(text) as T) : null;

  if (!response.ok) {
    const message =
      typeof data === "object" &&
      data !== null &&
      "message" in data &&
      typeof data.message === "string"
        ? data.message
        : `GitHub API request failed with status ${response.status}`;

    throw Object.assign(new Error(message), {
      status: response.status,
      data,
    });
  }

  return { status: response.status, data };
}

const releasePayload = {
  tag_name: tagName,
  target_commitish: targetCommitish,
  name: releaseName,
  body,
  draft: false,
  prerelease: false,
};

try {
  const existing = await githubRequest<ReleaseResponse>(
    `/repos/${owner}/${repo}/releases/tags/${encodeURIComponent(tagName)}`,
  );

  if (!existing.data) {
    throw new Error("Expected an existing release payload.");
  }

  await githubRequest(`/repos/${owner}/${repo}/releases/${existing.data.id}`, {
    method: "PATCH",
    body: JSON.stringify(releasePayload),
    headers: {
      "Content-Type": "application/json",
    },
  });
} catch (error) {
  const status =
    typeof error === "object" && error !== null && "status" in error
      ? Number(error.status)
      : null;

  if (status !== 404) {
    throw error;
  }

  await githubRequest(`/repos/${owner}/${repo}/releases`, {
    method: "POST",
    body: JSON.stringify(releasePayload),
    headers: {
      "Content-Type": "application/json",
    },
  });
}
