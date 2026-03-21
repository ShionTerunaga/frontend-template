import path from "node:path";
import { appsRoot, templateRoot } from "./base.ts";
import { run } from "./copy-logic.ts";

const vueCopies = [
    ["nuxt", "scoped-css"],
    ["nuxt", "vanilla-extract"],
    ["vue-router", "scoped-css"],
    ["vue-router", "vanilla-extract"]
] as const;

export async function vueCopy() {
    for (const segments of vueCopies) {
        const srcDir = path.join(appsRoot, "vue", ...segments);
        const destDir = path.join(templateRoot, "vue", ...segments);
        await run(srcDir, destDir);
    }
}
