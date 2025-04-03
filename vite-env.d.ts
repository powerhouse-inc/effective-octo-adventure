/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_ENABLE_SPLIT_MODE: string
    readonly VITE_ENABLE_READ_ONLY_MODE: string
    // more env variables...
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }