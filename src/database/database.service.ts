import Config from '../app/config';
import firebase from 'firebase';
import { Logger } from '@nestjs/common';

export class DatabaseService {
    public db: firebase.firestore.Firestore;

    constructor() {
        const config = {
            apiKey: Config.FIREBASE_API_KEY,
            authDomain: Config.FIREBASE_AUTH_DOMAIN,
            databaseURL: Config.FIREBASE_DATABASE_URL,
            projectId: Config.FIREBASE_PROJECT_ID,
            storageBucket: Config.FIREBASE_STORAGE_BUCKET,
            messagingSenderId: Config.FIREBASE_MESSAGING_SENDER_ID,
        };
        firebase.initializeApp(config);
        this.db = firebase.firestore();
    }

    public async getCollection(collection: string) {
        return await this.db.collection(collection).get();
    }

    public async write(collection, data) {
        return await this.db.collection(collection).add(data);
    }

    public async read(collection) {
        return await this.getCollection(collection);
    }

}
