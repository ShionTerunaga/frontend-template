import path from "node:path";
import { appsDir } from "./base-path.ts";
import type { Target } from "./create-env.type.ts";

const caution = [
    "# CAUTION:",
    "# Be careful when using generative AI tools.",
    "# Secrets such as API keys, tokens, and private environment values may be leaked to external services.",
    "# Do not paste confidential values into AI prompts unless your policy explicitly allows it.",
    "#",
    "# 注意:",
    "# 生成AIを利用する際は注意してください。",
    "# APIキー、トークン、秘密情報などは外部サービスに送信・学習される可能性があります。",
    "# 組織のルールで許可されていない限り、機密情報をプロンプトへ貼り付けないでください。",
    ""
].join("\n");

const content = `${caution}VITE_API_KEY="https://hp-api.onrender.com/api/characters"\n`;

export const tanstackRouterEnv: Array<Target> = [
    {
        alias: "rtr-tw",
        dir: path.join(appsDir, "react", "tanstack-router", "tailwind"),
        content
    },
    {
        alias: "rtr-ve",
        dir: path.join(appsDir, "react", "tanstack-router", "vanilla-extract"),
        content
    }
];
