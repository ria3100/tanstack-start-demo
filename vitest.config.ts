import { defineConfig } from 'vite-plus'
import viteReact from '@vitejs/plugin-react'

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [viteReact()],
  test: {
    environment: 'jsdom',
  },
})
