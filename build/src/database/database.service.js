"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../app/config");
const firebase_1 = require("firebase");
class DatabaseService {
    constructor() {
        const config = {
            apiKey: config_1.default.FIREBASE_API_KEY,
            authDomain: config_1.default.FIREBASE_AUTH_DOMAIN,
            databaseURL: config_1.default.FIREBASE_DATABASE_URL,
            projectId: config_1.default.FIREBASE_PROJECT_ID,
            storageBucket: config_1.default.FIREBASE_STORAGE_BUCKET,
            messagingSenderId: config_1.default.FIREBASE_MESSAGING_SENDER_ID,
        };
        firebase_1.default.initializeApp(config);
        this.firestore = firebase_1.default.firestore();
    }
    getCollection(collection) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.firestore.collection(collection).get();
        });
    }
    write(collection, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.firestore.collection(collection).add(data);
        });
    }
    read(collection) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.getCollection(collection);
        });
    }
}
exports.DatabaseService = DatabaseService;
//# sourceMappingURL=database.service.js.map