import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { basename, dirname, resolve } from "node:path";

const [, , beforeArg, afterArg] = process.argv;
const zeroShaPattern = /^0+$/;
const before = beforeArg && !zeroShaPattern.test(beforeArg) ? beforeArg : null;
const after = afterArg || process.env.GITHUB_SHA || "HEAD";
const notesPath = resolve(
  process.env.RUNNER_TEMP || "/tmp",
  "frontend-template-release-notes.md",
);

function runGit(args) {
  return execFileSync("git", args, { encoding: "utf8" }).trim();
}

function getChangedFiles() {
  if (!before) {
    return runGit(["show", "--pretty=", "--name-only", after])
      .split(/\r?\n/)
      .filter(Boolean);
  }

  return runGit(["diff", "--name-only", before, after])
    .split(/\r?\n/)
    .filter(Boolean);
}

function getPackageHeading(filePath, content) {
  const firstHeading = content.match(/^# .+$/m)?.[0];
  if (firstHeading) {
    return firstHeading;
  }

  const packageJsonPath = resolve(dirname(filePath), "package.json");
  if (existsSync(packageJsonPath)) {
    try {
      const pkg = JSON.parse(readFileSync(packageJsonPath, "utf8"));
      if (pkg.name) {
        return `# ${pkg.name}`;
      }
    } catch {
      // fall through to the directory name fallback
    }
  }

  return `# ${basename(dirname(filePath))}`;
}

function extractLatestSection(filePath) {
  const content = readFileSync(filePath, "utf8");
  const lines = content.split(/\r?\n/);
  const startIndex = lines.findIndex((line) => /^## /.test(line));

  if (startIndex === -1) {
    return null;
  }

  const nextIndex = lines.findIndex(
    (line, index) => index > startIndex && /^## /.test(line),
  );
  const endIndex = nextIndex === -1 ? lines.length : nextIndex;
  const heading = getPackageHeading(filePath, content);
  const section = lines.slice(startIndex, endIndex).join("\n").trim();

  return `${heading}\n\n${section}`;
}

const changelogFiles = getChangedFiles()
  .filter((file) => file === "CHANGELOG.md" || file.endsWith("/CHANGELOG.md"))
  .sort();

const sections = changelogFiles
  .map((file) => extractLatestSection(file))
  .filter(Boolean);

const notes = sections.length
  ? sections.join("\n\n---\n\n")
  : "No changelog updates were found in this release branch sync.";

mkdirSync(dirname(notesPath), { recursive: true });
writeFileSync(notesPath, `${notes}\n`, "utf8");

if (process.env.GITHUB_OUTPUT) {
  const output = [
    `has_notes=${sections.length > 0 ? "true" : "false"}`,
    `notes_path=${notesPath}`,
    `tag_name=release-${after.slice(0, 7)}`,
    `release_name=Release ${after.slice(0, 7)}`,
  ].join("\n");

  writeFileSync(process.env.GITHUB_OUTPUT, `${output}\n`, { flag: "a" });
}
