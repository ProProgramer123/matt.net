declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PORT_HTTP?: string;
            PORT_WS?: string;
            JWT_SECRET?: string;
            VERSION_CHECK?: string;
            IGNORE_VERSION_CHECK?: "true" | "false";
            MOTD?: string;
            USE_NAMED_IMAGES?: "true" | "false";
            ENV?: "prod" | "dev";
            CDN_BASE_URI?: string;
            AMPLITUDE_KEY?: string;
            SQLITE_DB_PATH?: string;
            VERCEL?: string;
        }
    }
}

export {};