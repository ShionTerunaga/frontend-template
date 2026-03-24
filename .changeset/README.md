# Changesets

This repository uses Changesets to create a release PR from `main`.

## Release flow

1. Add a changeset for each user-facing change.
2. The `Create Release PR` workflow updates or opens the release PR against `main`.
3. When that release PR is merged into `main`, the `Sync Release Branch` workflow force-updates the `release` branch to the merged commit.
4. A push to `release` creates a GitHub Release whose body is copied from the generated package changelogs.

## Changelog metadata

We use `@changesets/changelog-github` so changelog entries can include PR links and contributor names.
To make the output explicit, add metadata like this to the changeset body when possible:

```md
---
"@apps/react-next-app-tailwind": patch
---

pr: #123
author: @your-github-name

Short summary of the change.
```

`author:` and `user:` are both supported. If those lines are omitted, the changelog generator falls back to GitHub commit and PR metadata when it can.
