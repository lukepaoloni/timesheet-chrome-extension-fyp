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
}
declare const _default: Config;
export default _default;
