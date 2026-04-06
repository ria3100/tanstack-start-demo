import { defineConfig } from 'vite-plus'
import { devtools } from '@tanstack/devtools-vite'

import { tanstackStart } from '@tanstack/react-start/plugin/vite'

import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const config = defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  staged: {
    '*': 'vp check --fix',
  },
  lint: {
    ignorePatterns: ['**/routeTree.gen.ts', '.storybook/**'],
    options: { typeAware: true, typeCheck: true },
    rules: {
      'import/no-cycle': 'off',
      'typescript/require-await': 'off',
    },
  },
  fmt: {
    semi: false,
    singleQuote: true,
    trailingComma: 'all',
    ignorePatterns: ['**/routeTree.gen.ts', '**/*.md', '.agents/skills/shadcn/**'],
  },
  plugins: [
    devtools(),
    tailwindcss(),
    tanstackStart(),
    viteReact({
      babel: {
        plugins: ['babel-plugin-react-compiler'],
      },
    }),
  ],
})

export default config
