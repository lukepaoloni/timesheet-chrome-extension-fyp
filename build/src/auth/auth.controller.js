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
const swagger_1 = require("@nestjs/swagger");
const auth_service_1 = require("./auth.service");
const passport_1 = require("@nestjs/passport");
const app_gateway_1 = require("@app/app.gateway");
const jwt = require("jsonwebtoken");
let AuthController = class AuthController {
    constructor(authService, appGateway) {
        this.authService = authService;
        this.appGateway = appGateway;
    }
    googleLogin() { }
    googleLoginCallback(req) {
        return req.user;
    }
    githubLogin() { }
    githubLoginCallback(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.user;
            const { integrate } = req.params;
            console.log('params', req.params);
            if (integrate) {
                console.log('Start the integration');
            }
            else {
                return yield this.authService.createUser(data);
            }
        });
    }
    bitbucketLogin() { }
    bitbucketLoginCallback(req) {
        return req.user;
    }
    verifyToken(token) {
        const { exp } = jwt.decode(token);
        if (Date.now() / 1000 > exp) {
            return {
                valid: false,
                message: 'Token has expired.',
            };
        }
        return {
            valid: true,
            message: 'Token is valid.',
        };
    }
};
__decorate([
    common_1.Get('google'),
    common_1.UseGuards(passport_1.AuthGuard('google')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "googleLogin", null);
__decorate([
    common_1.Get('google/callback'),
    common_1.UseGuards(passport_1.AuthGuard('google')),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "googleLoginCallback", null);
__decorate([
    common_1.Get('github'),
    common_1.UseGuards(passport_1.AuthGuard('github')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "githubLogin", null);
__decorate([
    common_1.Get('github/callback'),
    common_1.UseGuards(passport_1.AuthGuard('github')),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "githubLoginCallback", null);
__decorate([
    common_1.Get('bitbucket'),
    common_1.UseGuards(passport_1.AuthGuard('bitbucket')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "bitbucketLogin", null);
__decorate([
    common_1.Get('bitbucket/callback'),
    common_1.UseGuards(passport_1.AuthGuard('bitbucket')),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "bitbucketLoginCallback", null);
__decorate([
    common_1.Get('jwt/verify'),
    __param(0, common_1.Query('token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "verifyToken", null);
AuthController = __decorate([
    swagger_1.ApiUseTags('Authentication'),
    common_1.Controller('api/rest/auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService, app_gateway_1.AppGateway])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map