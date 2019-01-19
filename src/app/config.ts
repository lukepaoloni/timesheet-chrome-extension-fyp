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
}

export default new Config();
