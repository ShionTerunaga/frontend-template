import fs from "node:fs";
import { templateRoot } from "./base.ts";

export function deleteDirectories() {
    if (fs.existsSync(templateRoot)) {
        console.log(`✅ Cleaning existing template directory: ${templateRoot}\n`);
        fs.rmSync(templateRoot, { recursive: true, force: true });
    }
}
