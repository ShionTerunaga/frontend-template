import fs from "node:fs";
import path from "node:path";
import type { Target } from "./create-env.type.ts";
import { mainNextEnv } from "./next-main-env.ts";
import { tanstackRouterEnv } from "./tanstack-main.ts";
import { vueRouterEnv } from "./vue-router-main.ts";
import { nuxtEnv } from "./nuxt-main.ts";
import { reactRouterEnv } from "./react-router-main.ts";

const targets: Array<Target> = [
    ...mainNextEnv,
    ...reactRouterEnv,
    ...tanstackRouterEnv,
    ...vueRouterEnv,
    ...nuxtEnv
];

function ensureDirExists(dir: string) {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

for (const t of targets) {
    try {
        ensureDirExists(t.dir);
        const filePath = path.join(t.dir, ".env");
        fs.writeFileSync(filePath, t.content, { encoding: "utf8" });
        console.log(`Wrote ${t.alias}: ${path.relative(process.cwd(), filePath)}`);
    } catch (err) {
        console.error(`Failed to write .env in ${t.dir}:`, err);
        process.exitCode = 2;
    }
}

// exit normally
process.exitCode = 0;
