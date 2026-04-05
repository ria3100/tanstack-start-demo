# TanStack Start Demo

## セットアップ

```bash
pnpm install
pnpm dev
```

## ビルド

```bash
pnpm build
```

## テスト

[Vitest](https://vitest.dev/) を使用。

```bash
pnpm test
```

## スタイリング

[Tailwind CSS](https://tailwindcss.com/) v4 を使用。

## Lint / フォーマット

[oxlint](https://oxc.rs/docs/guide/usage/linter) と [oxfmt](https://oxc.rs/docs/guide/usage/formatter) を使用。

```bash
pnpm lint      # oxlint
pnpm format    # oxfmt --check
pnpm check     # oxfmt --write && oxlint --fix
```

## shadcn

[shadcn](https://ui.shadcn.com/) でUIコンポーネントを追加できる。生成されたコンポーネントは `src/components/ui/` に配置される。

```bash
pnpm dlx shadcn@latest add button
```

## Storybook

```bash
pnpm storybook
```

## ディレクトリ構成

```
src/
  components/
    ui/          # shadcn 生成コンポーネント
    common/      # 汎用コンポーネント
      layout/    # Header, Footer, ThemeToggle
      media/     # Image, Picture
  routes/        # ファイルベースルーティング
  lib/           # ユーティリティ
```

## ルーティング

[TanStack Router](https://tanstack.com/router) のファイルベースルーティングを使用。`src/routes/` にファイルを追加するとルートが自動生成される。

### ルートの追加

`src/routes/` にファイルを追加する。TanStack Router がルートファイルの内容を自動生成する。

### リンク

```tsx
import { Link } from '@tanstack/react-router'

<Link to="/about">About</Link>
```

### レイアウト

レイアウトは `src/routes/__root.tsx` に定義する。全ルート共通のUIはここに記述する。

## サーバー関数

```tsx
import { createServerFn } from '@tanstack/react-start'

const getServerTime = createServerFn({
  method: 'GET',
}).handler(async () => {
  return new Date().toISOString()
})
```

## API ルート

```tsx
import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'

export const Route = createFileRoute('/api/hello')({
  server: {
    handlers: {
      GET: () => json({ message: 'Hello, World!' }),
    },
  },
})
```

## データ取得

TanStack Query またはTanStack Router の `loader` でデータを取得できる。

```tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/people')({
  loader: async () => {
    const response = await fetch('https://swapi.dev/api/people')
    return response.json()
  },
  component: PeopleComponent,
})

function PeopleComponent() {
  const data = Route.useLoaderData()
  return (
    <ul>
      {data.results.map((person) => (
        <li key={person.name}>{person.name}</li>
      ))}
    </ul>
  )
}
```

詳細は [Loader ドキュメント](https://tanstack.com/router/latest/docs/framework/react/guide/data-loading#loader-parameters) を参照。

## 参考

- [TanStack ドキュメント](https://tanstack.com)
- [TanStack Start ドキュメント](https://tanstack.com/start)
