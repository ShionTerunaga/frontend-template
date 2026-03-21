import fs from "node:fs";
import path from "node:path";

const rootDir = process.cwd();
const appsDir = path.join(rootDir, "apps");

const ignoredDirs = new Set<string>([".git", ".next", ".nuxt", ".output", "dist", "coverage"]);
let removedNodeModules = 0;
let removedLockfiles = 0;

function walk(dir: string): void {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const fullPath = path.join(dir, entry.name);

        if (entry.isDirectory()) {
            if (entry.name === "node_modules") {
                fs.rmSync(fullPath, { recursive: true, force: true });
                removedNodeModules += 1;
                continue;
            }

            if (ignoredDirs.has(entry.name)) {
                continue;
            }

            walk(fullPath);
            continue;
        }

        if (entry.isFile() && entry.name === "pnpm-lock.yaml") {
            fs.rmSync(fullPath, { force: true });
            removedLockfiles += 1;
        }
    }
}

if (fs.existsSync(appsDir)) {
    walk(appsDir);
}

console.log(`Removed ${removedNodeModules} app node_modules directories`);
console.log(`Removed ${removedLockfiles} nested pnpm-lock.yaml files`);
