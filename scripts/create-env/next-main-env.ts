import path from "node:path";
import type { Target } from "./create-env.type.ts";
import { appsDir } from "./base-path.ts";

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

const appContents = `${caution}API_KEY="https://hp-api.onrender.com/api/characters"\nAPI_KEY2="https://dog.ceo/api/breeds/image/random"\n`;
const pagesContents = `${caution}NEXT_PUBLIC_API_KEY="https://hp-api.onrender.com/api/characters"\n`;

export const mainNextEnv: Array<Target> = [
    {
        alias: "rna-tw",
        dir: path.join(appsDir, "react", "next", "app", "tailwind"),
        content: appContents
    },
    {
        alias: "rna-ve",
        dir: path.join(appsDir, "react", "next", "app", "vanilla-extract"),
        content: appContents
    },
    {
        alias: "rnp-tw",
        dir: path.join(appsDir, "react", "next", "pages", "tailwind"),
        content: pagesContents
    },
    {
        alias: "rnp-ve",
        dir: path.join(appsDir, "react", "next", "pages", "vanilla-extract"),
        content: pagesContents
    }
];
