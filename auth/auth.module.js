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
Object.defineProperty(exports, '__esModule', { value: true });
const app_gateway_1 = require('../app/app.gateway');
const common_1 = require('@nestjs/common');
const auth_service_1 = require('./auth.service');
const user_module_1 = require('../user/user.module');
const passport_1 = require('@nestjs/passport');
const jwt_1 = require('@nestjs/jwt');
const jwt_strategy_1 = require('./strategy/jwt.strategy');
const google_strategy_1 = require('./strategy/google.strategy');
const auth_controller_1 = require('./auth.controller');
const config_1 = require('../app/config');
const github_strategy_1 = require('./strategy/github.strategy');
const bitbucket_strategy_1 = require('./strategy/bitbucket.strategy');
let AuthModule = class AuthModule {};
AuthModule = __decorate(
    [
        common_1.Global(),
        common_1.Module({
            imports: [
                user_module_1.UserModule,
                passport_1.PassportModule.register({ defaultStrategy: 'jwt', session: true }),
                jwt_1.JwtModule.register({
                    secretOrPrivateKey: config_1.default.JWT_SECRET_KEY || 'secretKey',
                    signOptions: {
                        expiresIn: config_1.default.SESSION_EXPIRES_IN,
                    },
                }),
            ],
            providers: [
                auth_service_1.AuthService,
                jwt_strategy_1.JwtStrategy,
                google_strategy_1.GoogleStrategy,
                github_strategy_1.GithubStrategy,
                bitbucket_strategy_1.BitbucketStrategy,
                app_gateway_1.AppGateway,
            ],
            exports: [auth_service_1.AuthService, jwt_strategy_1.JwtStrategy],
            controllers: [auth_controller_1.AuthController],
        }),
    ],
    AuthModule,
);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map
