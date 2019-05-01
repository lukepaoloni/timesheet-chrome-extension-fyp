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
const passport_1 = require("@nestjs/passport");
const passport_google_oauth_1 = require("passport-google-oauth");
const auth_service_1 = require("../auth.service");
const config_1 = require("../../app/config");
const provider_enum_1 = require("../enum/provider.enum");
const app_gateway_1 = require("../../app/app.gateway");
let GoogleStrategy = class GoogleStrategy extends passport_1.PassportStrategy(passport_google_oauth_1.OAuth2Strategy, 'google') {
    constructor(authService, appGateway) {
        super({
            clientID: config_1.default.GOOGLE_CLIENT_ID,
            clientSecret: config_1.default.GOOGLE_CLIENT_SECRET,
            callbackURL: config_1.default.GOOGLE_REDIRECT_URI,
            passReqToCallback: true,
            scope: ['profile', 'email'],
        }, (request, accessToken, refreshToken, profile, done) => __awaiter(this, void 0, void 0, function* () {
            const email = profile.emails[0].value;
            const jwt = yield this.authService.validateOAuthLogin(profile.id, provider_enum_1.Provider.GOOGLE);
            const userExists = (yield this.authService.validateUser({ email }));
            if (!userExists) {
                const userData = yield this.authService.userService.create({
                    name: profile.displayName,
                    email,
                    integrations: {
                        google: {
                            id: profile.id,
                            token: accessToken,
                        },
                    },
                });
                yield userData.save();
            }
            const user = {
                email,
                name: profile.displayName,
                integrations: {
                    google: {
                        id: profile.id,
                        token: accessToken,
                    },
                },
                jwt,
            };
            this.appGateway.wss.emit(provider_enum_1.Provider.GOOGLE, user);
            done(null, user);
        }));
        this.authService = authService;
        this.appGateway = appGateway;
    }
};
GoogleStrategy = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [auth_service_1.AuthService, app_gateway_1.AppGateway])
], GoogleStrategy);
exports.GoogleStrategy = GoogleStrategy;
//# sourceMappingURL=google.strategy.js.map