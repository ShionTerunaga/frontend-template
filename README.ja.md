# main-template

## 概要

このリポジトリは、テンプレート CLI から利用するための **テンプレート集** です。  
React / Vue の複数テンプレートを `pnpm workspace` + `Turborepo` で管理しています。

このリポジトリ自体は、**そのまま直接アプリケーションとして利用する前提ではありません**。  
想定している使い方は、CLI がこのテンプレートを元に必要な構成をコピー、生成、加工することです。

## 注意

- このリポジトリはテンプレートの母体です
- 直接本番運用するための単一アプリではありません
- `apps/` 配下には複数の独立テンプレートが含まれます
- `pnpm install` は monorepo 全体に対して実行します
- build / test の結果は [`.reports`](./.reports) に出力されます

## セットアップ

```bash
pnpm install
```

依存関係が壊れた場合は、必要に応じて以下を使えます。

```bash
pnpm reinstall:all
pnpm doctor:deps
```

## スクリプト

### 開発

```bash
pnpm dev
pnpm dev:list
pnpm dev:rna-tw
pnpm dev:rna-ve
pnpm dev:rnp-tw
pnpm dev:rnp-ve
pnpm dev:rr-ve
pnpm dev:rtr-tw
pnpm dev:rtr-ve
pnpm dev:vn-sc
pnpm dev:vn-ve
pnpm dev:vr-sc
pnpm dev:vr-ve
```

- `pnpm dev`: 利用可能な dev コマンド一覧を表示します
- `pnpm dev:list`: dev コマンド一覧を表示します
- `pnpm dev:<alias>`: 指定テンプレートだけ dev サーバーを起動します
- `pnpm dev:all`: 全テンプレートの dev を並列実行します

### ビルド

```bash
pnpm build
pnpm build:list
pnpm build:all
pnpm build:rna-tw
pnpm build:rna-ve
pnpm build:rnp-tw
pnpm build:rnp-ve
pnpm build:rr-ve
pnpm build:rtr-tw
pnpm build:rtr-ve
pnpm build:vn-sc
pnpm build:vn-ve
pnpm build:vr-sc
pnpm build:vr-ve
```

- `pnpm build`: `pnpm build:all` を実行します
- `pnpm build:list`: build コマンド一覧を表示します
- `pnpm build:all`: 全テンプレートを順番に build します
- `pnpm build:<alias>`: 指定テンプレートだけ build します
- build 実行時は、成功 / 失敗サマリとレポート保存先を出力します

### テスト

```bash
pnpm test
pnpm test:list
pnpm test:all
pnpm test:rna-tw
pnpm test:rna-ve
pnpm test:rnp-tw
pnpm test:rnp-ve
pnpm test:rr-ve
pnpm test:rtr-tw
pnpm test:rtr-ve
pnpm test:vn-sc
pnpm test:vn-ve
pnpm test:vr-sc
pnpm test:vr-ve
```

- `pnpm test`: `pnpm test:all` を実行します
- `pnpm test:list`: test コマンド一覧を表示します
- `pnpm test:all`: 全テンプレートを順番に test します
- `pnpm test:<alias>`: 指定テンプレートだけ test します
- test 実行時は、成功 / 失敗サマリとレポート保存先を出力します

### 補助

```bash
pnpm lint
pnpm typecheck
pnpm check
pnpm install:all
pnpm clean:workspace
pnpm reinstall:all
pnpm doctor:deps
```

- `pnpm lint`: workspace 全体の lint を実行します
- `pnpm typecheck`: workspace 全体の型チェックを実行します
- `pnpm check`: lint / test / typecheck をまとめて実行します
- `pnpm install:all`: monorepo 全体に依存関係を install します
- `pnpm clean:workspace`: 各 app 配下の不要な `node_modules` / `pnpm-lock.yaml` を掃除します
- `pnpm reinstall:all`: clean 後に再 install します
- `pnpm doctor:deps`: workspace 内の依存解決状態を確認します

## エイリアス一覧

- `rna-tw`: React / Next / App Router / Tailwind
- `rna-ve`: React / Next / App Router / Vanilla Extract
- `rnp-tw`: React / Next / Pages Router / Tailwind
- `rnp-ve`: React / Next / Pages Router / Vanilla Extract
- `rr-ve`: React / React Router / Vanilla Extract
- `rtr-tw`: React / TanStack Router / Tailwind
- `rtr-ve`: React / TanStack Router / Vanilla Extract
- `vn-sc`: Vue / Nuxt / Scoped CSS
- `vn-ve`: Vue / Nuxt / Vanilla Extract
- `vr-sc`: Vue / Vue Router / Scoped CSS
- `vr-ve`: Vue / Vue Router / Vanilla Extract
