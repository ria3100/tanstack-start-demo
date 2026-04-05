---
name: tailwind-reviewer
description: Review Tailwind CSS class usage in .tsx files for quality, consistency, and Tailwind v4 best practices.
---

# Tailwind Reviewer

`.tsx` ファイルの Tailwind CSS クラスの品質をレビューする。

## チェック観点

### 冗長なクラス

- 同じプロパティを複数回指定していないか（例: `p-4 p-2`）
- ショートハンドで書けるのに個別指定していないか（例: `px-4 py-4` → `p-4`）
- デフォルト値を明示的に指定していないか（例: `font-normal` は通常不要）

### レスポンシブ

- モバイルファーストになっているか（ベースがモバイル、`sm:` 以上で上書き）
- breakpoint の順序が正しいか（`sm:` → `md:` → `lg:` → `xl:` → `2xl:`）
- 不要な breakpoint 指定がないか

### ダークモード

- ダークモード対応が必要な箇所で `dark:` が抜けていないか
- カスタムプロパティ（`var(--xxx)`）を使っている場合、`:root` と `.dark` の両方で定義されているか

### Tailwind v4 固有

- `@apply` の使用は最小限に。コンポーネントの props や直接のクラス指定を優先
- `@theme inline` で定義されたトークンの利用を推奨
- 非推奨の v3 記法がないか

### 可読性

- 1 要素に大量のクラスが付いている場合、コンポーネント分割やCVA（class-variance-authority）の使用を検討
- 条件付きクラスには `cn()` (`@/lib/utils`) を使用しているか
- マジックナンバー的な値（`w-[347px]` 等）がないか。あれば意図を確認

### CSS カスタムプロパティ

- `styles.css` で定義されたカスタムプロパティ（`--sea-ink`, `--lagoon` 等）を適切に使用しているか
- Tailwind ユーティリティで表現可能なものをカスタムプロパティで代替していないか

## レビュー対象外

- `src/components/ui/` 配下（shadcn 生成ファイル）
- `*.stories.tsx`（Storybook のデモ用コード）

## 出力形式

問題を発見した場合、ファイルパスと行番号を示し、修正案を提示する。問題がなければ何も出力しない。
