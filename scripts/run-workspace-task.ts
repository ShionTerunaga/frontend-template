import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { workspaceProjects, type WorkspaceProject } from "./workspace-projects.ts";

type TaskName = "build" | "test" | "build-storybook";

const ansi = {
    reset: "\u001b[0m",
    bold: "\u001b[1m",
    dim: "\u001b[2m",
    blue: "\u001b[34m",
    green: "\u001b[32m",
    red: "\u001b[31m",
    yellow: "\u001b[33m"
};

function colorize(text: string, ...styles: string[]): string {
    return `${styles.join("")}${text}${ansi.reset}`;
}

const task = process.argv[2] as TaskName | undefined;
const target = process.argv[3];

if (!task || !target || !["build", "test", "build-storybook"].includes(task)) {
    console.error("Usage: node --experimental-strip-types ./scripts/run-workspace-task.ts <build|test|build-storybook> <alias|all>");
    process.exit(1);
}

const projects = target === "all"
    ? workspaceProjects
    : workspaceProjects.filter((project) => project.alias === target);

if (projects.length === 0) {
    console.error(`Unknown target: ${target}`);
    process.exit(1);
}

const reportsDir = path.join(process.cwd(), ".reports", task);
fs.mkdirSync(reportsDir, { recursive: true });

const timestamp = new Date().toISOString().replaceAll(":", "-");
const results: Array<{
    project: WorkspaceProject;
    exitCode: number;
    reportPath: string;
}> = [];

for (const project of projects) {
    console.log(
        `\n${colorize("==>", ansi.blue, ansi.bold)} ${colorize(`${task}:${project.alias}`, ansi.bold)} ${colorize(`(${project.packageName})`, ansi.dim)}`
    );

    const result = spawnSync(
        "pnpm",
        ["--filter", project.packageName, "run", task],
        {
            cwd: process.cwd(),
            encoding: "utf8",
            maxBuffer: 1024 * 1024 * 20,
            shell: true
        }
    );

    const output = [result.stdout ?? "", result.stderr ?? ""].filter(Boolean).join("\n");
    const reportPath = path.join(reportsDir, `${timestamp}-${project.alias}.log`);
    fs.writeFileSync(reportPath, output);

    if (result.stdout) {
        process.stdout.write(result.stdout);
    }

    if (result.stderr) {
        process.stderr.write(result.stderr);
    }

    results.push({
        project,
        exitCode: result.status ?? 1,
        reportPath
    });
}

const failed = results.filter((result) => result.exitCode !== 0);

console.log(`\n${colorize(`${task.toUpperCase()} REPORT`, ansi.bold, ansi.blue)}`);
for (const result of results) {
    const passed = result.exitCode === 0;
    const status = passed
        ? colorize("PASS", ansi.bold, ansi.green)
        : colorize("FAIL", ansi.bold, ansi.red);
    console.log(`- ${status} ${result.project.alias} ${colorize(`(${result.project.packageName})`, ansi.dim)}`);
    console.log(`  ${colorize("report:", ansi.yellow)} ${result.reportPath}`);
}

if (failed.length > 0) {
    console.error(`\n${colorize(`${task} failed in ${failed.length} project(s):`, ansi.bold, ansi.red)}`);
    for (const result of failed) {
        console.error(`- ${colorize(result.project.alias, ansi.red)} ${colorize(`(${result.project.packageName})`, ansi.dim)}`);
        console.error(`  ${colorize("report:", ansi.yellow)} ${result.reportPath}`);
    }
    process.exit(1);
}
