import react from '@vitejs/plugin-react'
import type { UserConfig } from 'vite'
import dotenv from 'dotenv'

/* Use dotenv instead of vite import.meta property inside vite's config  */
dotenv.config();

export default {
  plugins: [react()],
  base: '.' + process.env.VITE_BASE_PATH,
  build: {
    assetsDir: '.' + process.env.VITE_BASE_PATH as string + process.env.VITE_ASSETS_DIR as string,
  }
} satisfies UserConfig