import fs from "node:fs";
import path from "node:path";

const rootDir = process.cwd();
const appsDir = path.join(rootDir, "apps");
const ignoredDirs = new Set<string>(["node_modules", ".next", ".nuxt", ".output", "dist", "coverage"]);
const packagePaths: string[] = [];
const failures: string[] = [];

function findPackages(dir: string): void {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const fullPath = path.join(dir, entry.name);

        if (entry.isDirectory()) {
            if (ignoredDirs.has(entry.name)) {
                continue;
            }

            findPackages(fullPath);
            continue;
        }

        if (entry.isFile() && entry.name === "package.json") {
            packagePaths.push(fullPath);
        }
    }
}

findPackages(appsDir);

for (const packagePath of packagePaths) {
    const packageDir = path.dirname(packagePath);
    const pkg = JSON.parse(fs.readFileSync(packagePath, "utf8")) as {
        name: string;
        dependencies?: Record<string, string>;
        devDependencies?: Record<string, string>;
    };

    const dependencyNames = [
        ...Object.keys(pkg.dependencies ?? {}),
        ...Object.keys(pkg.devDependencies ?? {})
    ];

    for (const dependencyName of dependencyNames) {
        const dependencyPath = path.join(packageDir, "node_modules", ...dependencyName.split("/"));

        if (!fs.existsSync(dependencyPath)) {
            failures.push(`${pkg.name}: missing ${dependencyName}`);
        }
    }
}

if (failures.length > 0) {
    console.error("Workspace dependency check failed:");
    for (const failure of failures) {
        console.error(`- ${failure}`);
    }
    process.exit(1);
}

console.log(`Verified dependencies for ${packagePaths.length} workspace packages`);
