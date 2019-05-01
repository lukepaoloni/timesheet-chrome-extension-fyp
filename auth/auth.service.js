'use strict';
var __decorate =
    (this && this.__decorate) ||
    function(decorators, target, key, desc) {
        var c = arguments.length,
            r =
                c < 3
                    ? target
                    : desc === null
                    ? (desc = Object.getOwnPropertyDescriptor(target, key))
                    : desc,
            d;
        if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if ((d = decorators[i]))
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
var __metadata =
    (this && this.__metadata) ||
    function(k, v) {
        if (typeof Reflect === 'object' && typeof Reflect.metadata === 'function')
            return Reflect.metadata(k, v);
    };
var __param =
    (this && this.__param) ||
    function(paramIndex, decorator) {
        return function(target, key) {
            decorator(target, key, paramIndex);
        };
    };
var __awaiter =
    (this && this.__awaiter) ||
    function(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function(resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value));
                } catch (e) {
                    reject(e);
                }
            }
            function rejected(value) {
                try {
                    step(generator['throw'](value));
                } catch (e) {
                    reject(e);
                }
            }
            function step(result) {
                result.done
                    ? resolve(result.value)
                    : new P(function(resolve) {
                          resolve(result.value);
                      }).then(fulfilled, rejected);
            }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
Object.defineProperty(exports, '__esModule', { value: true });
const common_1 = require('@nestjs/common');
const user_service_1 = require('../user/user.service');
const jwt_1 = require('@nestjs/jwt');
const config_1 = require('../app/config');
const jsonwebtoken_1 = require('jsonwebtoken');
const firebase_1 = require('firebase');
const jwt = require('jsonwebtoken');
let AuthService = class AuthService {
    constructor(userService, jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }
    createUser(data) {
        return __awaiter(this, void 0, void 0, function*() {
            const userExists = yield this.validateUser({
                email: data.email,
            });
            if (!userExists) {
                delete data.jwt;
                const userData = yield this.userService.create(data);
                const user = yield userData.save();
                const newUser = yield user.get();
                return newUser.data();
            }
        });
    }
    verifyToken(token) {
        return jwt.verify(token, config_1.default.JWT_SECRET_KEY);
    }
    createToken(credentials) {
        return __awaiter(this, void 0, void 0, function*() {
            const user = yield this.userService.login(credentials);
            const accessToken = this.jwtService.sign({ email: user.email });
            return {
                expiresIn: config_1.default.SESSION_EXPIRES_IN,
                accessToken,
            };
        });
    }
    validateOAuthLogin(thirdPartyId, provider) {
        return __awaiter(this, void 0, void 0, function*() {
            try {
                return jsonwebtoken_1.sign(
                    {
                        thirdPartyId,
                        provider,
                    },
                    config_1.default.JWT_SECRET_KEY,
                    {
                        expiresIn: config_1.default.SESSION_EXPIRES_IN,
                    },
                );
            } catch (err) {
                throw new common_1.ForbiddenException('validateOAuthLogin', err.message);
            }
        });
    }
    signPayload(payload) {
        return __awaiter(this, void 0, void 0, function*() {
            return jsonwebtoken_1.sign(payload, config_1.default.JWT_SECRET_KEY, {
                expiresIn: config_1.default.SESSION_EXPIRES_IN,
            });
        });
    }
    validatePayload(payload) {
        return __awaiter(this, void 0, void 0, function*() {
            return yield this.userService.getOneByEmail(payload.email);
        });
    }
    validateUser(payload) {
        return __awaiter(this, void 0, void 0, function*() {
            if (payload.id) {
                return yield this.userService.getOne(payload.id);
            }
            if (payload.email) {
                return yield this.userService.getOneByEmail(payload.email);
            }
            if (payload.thirdPartyId) {
                return yield this.userService.getOneByProvider(
                    payload.provider,
                    payload.thirdPartyId,
                );
            }
        });
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function*() {
            return yield firebase_1.auth().signInWithEmailAndPassword(email, password);
        });
    }
};
AuthService = __decorate(
    [
        common_1.Injectable(),
        __param(0, common_1.Inject(common_1.forwardRef(() => user_service_1.UserService))),
        __metadata('design:paramtypes', [user_service_1.UserService, jwt_1.JwtService]),
    ],
    AuthService,
);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map
