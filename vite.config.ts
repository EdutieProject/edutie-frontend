import react from '@vitejs/plugin-react'
import type { UserConfig } from 'vite'

export default {
  plugins: [react()],
  base: "/app",
  build: {
    assetsDir: "./app/assets",
  }
} satisfies UserConfig