/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_ENV_MODE: string;
    readonly VITE_BACKEND_HOST: string;
    readonly VITE_AUTH_HOST: string; // used only for local dev env
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}