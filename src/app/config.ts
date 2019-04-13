import * as dotenv from 'dotenv';
import { inject, toBoolean, toString, toNumber, toArray, toObject } from 'typescript-stringcaster';
dotenv.config();
const source = process.env;

class Config {
    @inject({ cast: toNumber, defaultValue: 4000, source })
    APP_PORT: number;

    @inject({ cast: toString, source })
    TYPEORM_CONNECTION: string | undefined;

    @inject({ cast: toString, source })
    FIREBASE_API_KEY: string | undefined;

    @inject({ cast: toString, source })
    FIREBASE_AUTH_DOMAIN: string | undefined;

    @inject({ cast: toString, source })
    FIREBASE_DATABASE_URL: string | undefined;

    @inject({ cast: toString, source })
    FIREBASE_PROJECT_ID: string | undefined;

    @inject({ cast: toString, source })
    FIREBASE_STORAGE_BUCKET: string | undefined;

    @inject({ cast: toString, source })
    FIREBASE_MESSAGING_SENDER_ID: number | undefined;

    @inject({ cast: toNumber, source })
    SALT_ROUNDS: number | undefined;

    @inject({ cast: toString, source })
    BITBUCKET_APP_USERNAME: string | undefined;

    @inject({ cast: toString, source })
    BITBUCKET_APP_PASSWORD: string | undefined;

    @inject({ cast: toString, source })
    JWT_SECRET_KEY: string | undefined;

    @inject({ cast: toBoolean, source })
    USE_CUSTOM_AUTHENTICATION: boolean | undefined;

    @inject({ cast: toBoolean, source })
    USE_GOOGLE_AUTHENTICATION: boolean | undefined;

    @inject({ cast: toNumber, source })
    SESSION_EXPIRES_IN: number | undefined;

    @inject({ cast: toString, source })
    APP_DOMAIN: string;

    @inject({ cast: toString, source })
    GOOGLE_CLIENT_ID: string | undefined;

    @inject({ cast: toString, source })
    GOOGLE_CLIENT_SECRET: string | undefined;

    @inject({ cast: toString, source })
    GOOGLE_REDIRECT_URI: string | undefined;

    @inject({ cast: toString, source })
    GITHUB_CLIENT_ID: string | undefined;

    @inject({ cast: toString, source })
    GITHUB_CLIENT_SECRET: string | undefined;

    @inject({ cast: toString, source })
    GITHUB_CALLBACK_URL: string | undefined;

    @inject({ cast: toString, source })
    BITBUCKET_CLIENT_ID: string | undefined;

    @inject({ cast: toString, source })
    BITBUCKET_CLIENT_SECRET: string | undefined;

    @inject({ cast: toString, source })
    BITBUCKET_CALLBACK_URL: string | undefined;

    @inject({ cast: toString, source })
    PUSH_NOTIFICATION_PUBLIC_KEY: string | undefined;

    @inject({ cast: toString, source })
    PUSH_NOTIFICATION_PRIVATE_KEY;
}

export default new Config();
