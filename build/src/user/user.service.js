"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const user_model_1 = require("./user.model");
const database_service_1 = require("@db/database.service");
const service_1 = require("../shared/service");
const bcrypt = require("bcrypt");
const config_1 = require("@app/config");
const auth_service_1 = require("../auth/auth.service");
const firebase_1 = require("firebase");
const config_2 = require("@app/config");
const enum_1 = require("@shared/enum");
let UserService = class UserService extends service_1.AbstractService {
    constructor(db, authService) {
        super(db, 'users');
        this.authService = authService;
    }
    getCollection() {
        const _super = Object.create(null, {
            getAll: { get: () => super.getAll }
        });
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield _super.getAll.call(this);
            let collection = [];
            data.forEach(datum => {
                collection.push(new user_model_1.User(datum).getData());
            });
            return collection;
        });
    }
    getOneByProvider(provider, thirdPartyId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.db.firestore
                .collection('users')
                .where(`integrations.${provider}.id`, '==', thirdPartyId)
                .limit(1);
            const users = yield result.get();
            if (users.docs[0])
                return new user_model_1.User(Object.assign({}, users.docs[0].data(), { id: users.docs[0].id }));
            return null;
        });
    }
    login(credentials) {
        return __awaiter(this, void 0, void 0, function* () {
            const emailExists = yield this.getOneByEmail(credentials.email);
            if (!emailExists) {
                throw new common_1.UnauthorizedException('User was not found');
            }
            try {
                const { user } = yield firebase_1.auth().signInWithEmailAndPassword(credentials.email, credentials.password);
                const payload = {
                    id: user.uid,
                    email: user.email,
                };
                this.collection.doc(user.uid).update({ lastLoggedIn: new Date() });
                const token = yield this.authService.signPayload(payload);
                const date = new Date();
                date.setSeconds(date.getSeconds() + config_2.default.SESSION_EXPIRES_IN);
                return { token, email: user.email, expires: date };
            }
            catch (err) {
                throw new common_1.NotAcceptableException('Email or Password is incorrect. Please try again.');
            }
            return null;
        });
    }
    register(credentials) {
        return __awaiter(this, void 0, void 0, function* () {
            const authUser = yield firebase_1.auth().createUserWithEmailAndPassword(credentials.email, credentials.password);
            yield firebase_1.firestore()
                .collection('users')
                .doc(authUser.user.uid)
                .set({
                email: credentials.email,
                settings: {
                    dateTimeFormat: 'hh:mm',
                    enableNotifications: false,
                    weeklySubmissions: false,
                    weeklyUpdates: false,
                },
                createdAt: new Date(),
                updatedAt: new Date(),
                role: enum_1.ERole.USER,
            });
            return this.login(credentials);
        });
    }
    getOneByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!email) {
                throw new common_1.NotAcceptableException('Email is undefined.');
            }
            const result = yield this.db.firestore
                .collection('users')
                .where('email', '==', email)
                .limit(1);
            const users = yield result.get();
            if (users.docs[0])
                return new user_model_1.User(Object.assign({}, users.docs[0].data(), { id: users.docs[0].id }));
            return null;
        });
    }
    userValid(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.db.firestore
                .collection('users')
                .where('email', '==', email)
                .limit(1);
            const users = yield result.get();
            return yield bcrypt.compare(password, users.docs[0].data().password);
        });
    }
    create(data) {
        const _super = Object.create(null, {
            create: { get: () => super.create }
        });
        return __awaiter(this, void 0, void 0, function* () {
            if (data.password)
                data.password = yield bcrypt.hash(data.password, config_1.default.SALT_ROUNDS);
            _super.create.call(this, data);
            return this;
        });
    }
    update(id, data) {
        return super.update(id, data);
    }
    getAllForPushNotifications() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.getAll();
            return result.filter(user => user.fcmPayload);
        });
    }
    getOneByToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const results = yield this.db.firestore
                .collection('users')
                .where('token', '==', token)
                .limit(1);
            const users = yield results.get();
            if (users.docs[0].data())
                return new user_model_1.User(users.docs[0].data());
            return undefined;
        });
    }
};
UserService = __decorate([
    common_1.Injectable(),
    __param(1, common_1.Inject(common_1.forwardRef(() => auth_service_1.AuthService))),
    __metadata("design:paramtypes", [database_service_1.DatabaseService,
        auth_service_1.AuthService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map