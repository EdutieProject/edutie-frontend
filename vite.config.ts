import react from '@vitejs/plugin-react'
import type { UserConfig } from "vite";
import dotenv from 'dotenv'

/* Use dotenv instead of vite import.meta property inside vite's config  */
dotenv.config();

export default {
  plugins: [react()],
  base: "/app",
  build: {
    assetsDir: "app/assets",
  }
} satisfies UserConfig;