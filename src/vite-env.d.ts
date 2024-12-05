/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_BASE_PATH: string;
    readonly VITE_ASSETS_DIR: string;
    readonly VITE_DOMAIN_HOSTNAME: string;
    // more env variables...
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}