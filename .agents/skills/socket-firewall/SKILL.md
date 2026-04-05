---
name: socket-firewall
description: 依存関係を取得・変更する npm/pnpm コマンド実行時に Socket Firewall (sfw) を適用する。
---

# Socket Firewall

依存関係を取得・変更する `npm` / `pnpm` コマンドに Socket Firewall (`sfw`) を適用する。

## 対象コマンド

- `pnpm install`
- `pnpm add`
- `pnpm remove`
- `pnpm update`
- `pnpm up`
- `pnpm fetch`
- `npm install`
- `npm add`
- `npm update`

依存関係を取得しないコマンド（`dev`, `build`, `lint`, `check`, `test`, `exec` 等）には使用しない。

## ルール

依存関係を取得するコマンドの先頭に `sfw` を付ける:

```bash
sfw pnpm install --frozen-lockfile
sfw pnpm add zod
sfw pnpm remove lodash
sfw pnpm up
```

## プライベート GitHub Packages

- `.npmrc` でスコープ付きパッケージ（例: `@tricot-inc`）を GitHub Packages から取得している場合、無料版 Socket Firewall はプライベートレジストリを公式にはサポートしていない
- ただしプライベートパッケージがファーストパーティであれば、スキャンなしで通過しても許容する
- 目的はパブリック npm 依存関係を `sfw` 経由でスキャンすること

## 判断基準

1. 依存関係を取得するコマンドには `sfw` を付けられるか確認する
2. 読み取り専用で `sfw` が不要なコマンドはそのまま実行する
3. 既に `sfw pnpm ...` / `sfw npm ...` で始まっている場合はそのまま実行する
4. 失敗時に `sfw` なしで暗黙的にリトライしない。失敗を報告する

## レポート

- 依存関係取得コマンドの実行時、`sfw` で実行したことを簡潔に記載する
- プライベートレジストリのパッケージがスキャンなしで通過した場合、パブリック依存関係の保護は適用されている旨を記載する
