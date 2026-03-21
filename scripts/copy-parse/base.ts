import path from "node:path";
import { fileURLToPath } from "node:url";

const currentDir = path.dirname(fileURLToPath(import.meta.url));

export const root = path.resolve(currentDir, "..", "..");
export const appsRoot = path.join(root, "apps");
export const templateRoot = path.join(root, "template");
