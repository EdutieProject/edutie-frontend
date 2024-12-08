/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_ENV_MODE: string;
    readonly VITE_BASE_PATH_OVERRIDE: string;
    readonly VITE_ASSETS_DIR: string;
    readonly VITE_BACKEND_HOST: string;
    readonly VITE_AUTH_HOST: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}