import fs from "node:fs";
import path from "node:path";

const rootDir = process.cwd();
const rootLockfile = path.join(rootDir, "pnpm-lock.yaml");
const ignoredDirs = new Set<string>([".git"]);
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

        if (entry.isFile() && entry.name === "pnpm-lock.yaml" && fullPath !== rootLockfile) {
            fs.rmSync(fullPath, { force: true });
            removedLockfiles += 1;
        }
    }
}

walk(rootDir);

console.log(`Removed ${removedNodeModules} node_modules directories`);
console.log(`Removed ${removedLockfiles} nested pnpm-lock.yaml files`);
