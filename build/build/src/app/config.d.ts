declare class Config {
    APP_PORT: number;
    TYPEORM_CONNECTION: string | undefined;
    FIREBASE_API_KEY: string | undefined;
    FIREBASE_AUTH_DOMAIN: string | undefined;
    FIREBASE_DATABASE_URL: string | undefined;
    FIREBASE_PROJECT_ID: string | undefined;
    FIREBASE_STORAGE_BUCKET: string | undefined;
    FIREBASE_MESSAGING_SENDER_ID: number | undefined;
    SALT_ROUNDS: number | undefined;
    BITBUCKET_APP_USERNAME: string | undefined;
    BITBUCKET_APP_PASSWORD: string | undefined;
    JWT_SECRET_KEY: string | undefined;
    USE_CUSTOM_AUTHENTICATION: boolean | undefined;
    USE_GOOGLE_AUTHENTICATION: boolean | undefined;
    SESSION_EXPIRES_IN: number | undefined;
    APP_DOMAIN: string;
    GOOGLE_CLIENT_ID: string | undefined;
    GOOGLE_CLIENT_SECRET: string | undefined;
    GOOGLE_REDIRECT_URI: string | undefined;
    GITHUB_CLIENT_ID: string | undefined;
    GITHUB_CLIENT_SECRET: string | undefined;
    GITHUB_CALLBACK_URL: string | undefined;
    BITBUCKET_CLIENT_ID: string | undefined;
    BITBUCKET_CLIENT_SECRET: string | undefined;
    BITBUCKET_CALLBACK_URL: string | undefined;
}
declare const _default: Config;
export default _default;
