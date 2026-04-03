import { workspaceProjects } from "./workspace-projects.ts";

const task = process.argv[2];
const allowedTasks = ["dev", "build", "test", "storybook", "build-storybook"];

if (!task || !allowedTasks.includes(task)) {
    console.error("Usage: node --experimental-strip-types ./scripts/print-workspace-commands.ts <dev|build|test|storybook|build-storybook>");
    process.exit(1);
}

const lines = [
    `Available ${task} commands:`,
    ...workspaceProjects.map((project) => `  pnpm ${task}:${project.alias}  # ${project.description}`),
    `  pnpm ${task}:all`
];

console.log(lines.join("\n"));
