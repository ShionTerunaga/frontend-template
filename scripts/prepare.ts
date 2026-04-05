import { existsSync } from "node:fs";
import { spawnSync } from "node:child_process";

if (!existsSync(".git")) {
    console.log("Skipping lefthook install: .git directory not found");
    process.exit(0);
}

const cmd = process.platform === "win32" ? "lefthook.cmd" : "lefthook";
const result = spawnSync(cmd, ["install"], {
    stdio: "inherit",
    shell: true
});

process.exit(result.status ?? 1);
