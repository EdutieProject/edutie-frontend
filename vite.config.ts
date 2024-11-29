import react from '@vitejs/plugin-react'
import type { UserConfig } from 'vite'
import dotenv from 'dotenv'

dotenv.config();

export default {
  plugins: [react()],
  base: '.' + process.env.VITE_BASE_PATH,
  build: {
    assetsDir: '.' + process.env.VITE_BASE_PATH as string + process.env.VITE_ASSETS_DIR as string,
  },
  define: {
    "process.env": {}
  }
} satisfies UserConfig