declare module "bun" {
    interface Env {
        PORT_HTTP: string;
        PORT_WS: string;
        JWT_SECRET: string;
        VERSION_CHECK: string;
        IGNORE_VERSION_CHECK: "true" | "false";
        MOTD: string;
        USE_NAMED_IMAGES: "true" | "false";
        ENV: "prod"|"dev";
    }
}