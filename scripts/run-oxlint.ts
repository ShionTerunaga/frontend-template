import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const workspaceRoot = process.cwd();
const targetCwd = process.env.INIT_CWD ?? workspaceRoot;

function findOxlintBinary(rootDir: string): string | null {
    const directBinary = path.join(rootDir, "node_modules", ".bin", "oxlint");
    if (fs.existsSync(directBinary)) {
        return directBinary;
    }

    const searchRoots = ["apps", "template"];

    for (const searchRoot of searchRoots) {
        const absoluteRoot = path.join(rootDir, searchRoot);
        if (!fs.existsSync(absoluteRoot)) {
            continue;
        }

        const stack = [absoluteRoot];
        while (stack.length > 0) {
            const current = stack.pop()!;
            const candidate = path.join(current, "node_modules", ".bin", "oxlint");
            if (fs.existsSync(candidate)) {
                return candidate;
            }

            for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
                if (!entry.isDirectory() || entry.name === "node_modules") {
                    continue;
                }
                stack.push(path.join(current, entry.name));
            }
        }
    }

    return null;
}

const oxlintBinary = findOxlintBinary(workspaceRoot);

if (!oxlintBinary) {
    console.error("oxlint binary was not found in this workspace.");
    process.exit(1);
}

const result = spawnSync(oxlintBinary, process.argv.slice(2), {
    cwd: targetCwd,
    stdio: "inherit",
    shell: false
});

process.exit(result.status ?? 1);
