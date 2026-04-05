---
name: component-generator
description: Generate new components under src/components/common/ following project conventions (kebab-case, directory structure, stories).
---

# Component Generator

`src/components/common/` 配下に汎用コンポーネントを作成する際のルール。

## ディレクトリ構造

カテゴリごとにサブディレクトリを作り、その中にコンポーネントファイルと stories を配置する。

```
src/components/common/{category}/{component-name}.tsx
src/components/common/{category}/{component-name}.stories.tsx
```

例:
```
src/components/common/layout/header.tsx
src/components/common/layout/header.stories.tsx
src/components/common/media/picture.tsx
src/components/common/media/picture.stories.tsx
```

## ファイル命名

- ケバブケース（kebab-case）のみ。PascalCase 禁止
- 例: `theme-toggle.tsx`, `image-gallery.tsx`

## コンポーネント実装ルール

- named export を使用（`export { ComponentName }` or `export default`）
- props の型は同ファイルで定義し export する
- import alias は `@/*` を使用
- 外部ライブラリをラップする場合、直接 import せずラッパー経由で使用する（例: `@unpic/react` → `common/media/image.tsx`）

## Stories ルール

- 同ディレクトリに `{component-name}.stories.tsx` として作成
- `title` はディレクトリ構造に合わせる: `Common/{Category}/{ComponentName}`
- `tags: ['autodocs']` を付与
- テスト用画像が必要な場合は対応 CDN（Cloudinary demo 等）の URL を使用
- 全 variant / 主要な props の組み合わせを網羅

```tsx
import type { Meta, StoryObj } from '@storybook/react-vite'
import { ComponentName } from './component-name'

const meta = {
  title: 'Common/Category/ComponentName',
  component: ComponentName,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof ComponentName>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { /* ... */ },
}
```

## 配置の判断基準

- `src/components/ui/` — shadcn 生成コンポーネントのみ。手動で作成しない
- `src/components/common/` — 特定ページに依存しない汎用コンポーネント
- ページ固有のコンポーネントは `src/routes/` 内または `src/components/{feature}/` に配置
