declare namespace NodeJS {
  interface ProcessEnv {
    TOKEN: string;
    APPLICATION_ID: string;
    DEBUG_GUILD_ID: string;
    API_URL: string;
    API_TOKEN: string;
    ILUM_API: string;
    ILUM_API_TOKEN: string;
    I18N_TOKEN: string;
    CRYPTO_SECRET: string;
    CRYPTO_IV: string;
    DASHBOARD_URL: string;
    SENTRY_DSN: string;
  }
}
declare global {
  interface Console {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    log: (message: string, ...optionalParams: any[]) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    debug: (message: string, ...optionalParams: any[]) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error: (message: string, ...optionalParams: any[]) => void;
  }
}
