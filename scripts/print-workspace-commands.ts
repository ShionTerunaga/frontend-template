import { workspaceProjects } from "./workspace-projects.ts";

const task = process.argv[2];

if (!task || !["dev", "build", "test"].includes(task)) {
    console.error("Usage: node --experimental-strip-types ./scripts/print-workspace-commands.ts <dev|build|test>");
    process.exit(1);
}

const lines = [
    `Available ${task} commands:`,
    ...workspaceProjects.map((project) => `  pnpm ${task}:${project.alias}  # ${project.description}`),
    `  pnpm ${task}:all`
];

console.log(lines.join("\n"));
