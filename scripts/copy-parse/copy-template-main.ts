import { deleteDirectories } from "./delete-directories.ts";
import { reactCopy } from "./react-copy.ts";
import { vueCopy } from "./vue-copy.ts";

async function main() {
    deleteDirectories();
    await reactCopy();
    await vueCopy();
    console.log("✅ template export completed: ./template");
}

main().catch((error) => {
    console.error("❌ copy-parse failed:", error);
    process.exit(1);
});
