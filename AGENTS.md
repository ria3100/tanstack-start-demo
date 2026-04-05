# エージェント向け指針

## 目的

- プルリクエストをレビューする際は、このファイルの `PR レビュー` セクションを主要なレビュー基準として扱う
- GitHub 連携レビューでは、リポジトリ内スキルの自動利用を前提にしない。このファイルを正本として扱う

## ファイル命名

- ファイル名は kebab-case を使用する
- PascalCase のファイル名は作成しない
- 例: `theme-toggle.tsx`, `mcp-handler.ts`

## import エイリアス

- `@/*` を `src/*` のエイリアスとして使用する
- `#/*` は使用しない
- `package.json` の `imports` フィールドは使用しない

## コンポーネント構成

```text
src/components/
  ui/           # shadcn generated components
  common/       # reusable components
    layout/     # Header, Footer, ThemeToggle
    media/      # Image, Picture
  (feature)/    # feature-specific components
```

- `src/components/ui/` は shadcn の生成物用であり、手動で新規作成しない
- 汎用コンポーネントは `src/components/common/` 配下に配置する
- `@unpic/react` を直接 import せず `common/media/image.tsx` 経由で使用する

## ツール

- Lint: `pnpm lint`
- Format: `pnpm format`
- Test: `pnpm test`
- Check: `pnpm check`

## 画像

- 画像コンポーネントは `@unpic/react` ベース
- 単一画像は `Image` (`common/media/image.tsx`) を使用する
- breakpoint ごとの出し分けは `Picture` (`common/media/picture.tsx`) を使用する
- 対応 CDN は Cloudinary, imgix, Cloudflare, Vercel など

## PR レビュー

- 要約や感想より先に指摘事項を優先する
- 優先して見る対象は、バグ、回帰、挙動破壊、テスト不足、型安全性の低下、アクセシビリティ問題、保守性リスクとする
- 賞賛、要約、スタイル上の好みを主な内容にしない
- 可能な限り、ファイルと行番号を添えて具体的なリスクを指摘する
- レビューの優先順位は次の順とする
- 1. 挙動の正しさと回帰
- 2. 型安全性と実行時安全性
- 3. 変更された挙動に対するテスト不足
- 4. アクセシビリティと UX の破綻
- 5. このファイルに定義されたプロジェクト規約違反
- 6. Tailwind CSS の品質、不要なクラス重複、不適切なユーティリティ使用

### レビューチェック項目

- 変更内容が PR の意図に一致しており、黙ってスコープを広げていないか確認する
- loading、error、empty、edge case の状態が壊れていないか確認する
- 非同期処理、state 更新、条件分岐レンダリングに不正な前提がないか確認する
- unsafe cast、弱い型、nullability の無視、不要な `any` がないか確認する
- 変更された挙動が適切な粒度でテストされているか確認する
- ラベル欠落、キーボード操作不能、フォーカス喪失、セマンティクス不足などのアクセシビリティ問題がないか確認する
- 再利用コンポーネントが正しいディレクトリに配置され、命名規則に従っているか確認する
- `src/components/ui/` に生成物以外の手動編集が入っていないか確認する
- Tailwind のクラス指定に不要な複雑さ、競合するユーティリティ、既存パターンとの不整合がないか確認する

### レビュー出力

- 要約より先に指摘事項を並べる
- 各指摘は、何が問題か、なぜ問題か、どこで起きているかを具体的に書く
- 指摘事項がない場合は、その旨を明記し、残っているテスト不足や確認不足があれば併記する
