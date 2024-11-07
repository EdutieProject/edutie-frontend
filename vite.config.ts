import react from "@vitejs/plugin-react";
import type { UserConfig } from "vite";

type UserConfig = typeof UserConfig;
export default {
  plugins: [react()],
} satisfies UserConfig;
