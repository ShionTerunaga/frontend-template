import path from "node:path";
import { appsRoot, templateRoot } from "./base.ts";
import { run } from "./copy-logic.ts";

const reactCopies = [
    ["next", "app", "tailwind"],
    ["next", "app", "vanilla-extract"],
    ["next", "pages", "tailwind"],
    ["next", "pages", "vanilla-extract"],
    ["tanstack-router", "tailwind"],
    ["tanstack-router", "vanilla-extract"],
] as const;

export async function reactCopy() {
    for (const segments of reactCopies) {
        const srcDir = path.join(appsRoot, "react", ...segments);
        const destDir = path.join(templateRoot, "react", ...segments);
        await run(srcDir, destDir);
    }
}
