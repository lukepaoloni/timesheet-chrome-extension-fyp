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
const user_service_1 = require("./user.service");
const user_model_1 = require("./user.model");
const user_dto_1 = require("./dto/user.dto");
const swagger_1 = require("@nestjs/swagger");
const passport_1 = require("@nestjs/passport");
const credentials_dto_1 = require("@shared/credentials.dto");
const user_decorator_1 = require("./decorators/user.decorator");
const webPush = require("web-push");
const config_1 = require("@app/config");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
        webPush.setVapidDetails('mailto:lukepaoloni.me@gmail.com', config_1.default.PUSH_NOTIFICATION_PUBLIC_KEY, config_1.default.PUSH_NOTIFICATION_PRIVATE_KEY);
        this.userService = userService;
    }
    login(credentials) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userService.login(credentials);
        });
    }
    register(credentials) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.userService.register(credentials);
            }
            catch (err) {
                throw new common_1.ForbiddenException(err.message);
            }
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userService.getAll();
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userService.create(data);
            const save = yield user.save();
            const newUser = yield save.get();
            return newUser.data();
        });
    }
    me(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userService.getOne(data);
            const userData = yield user.get();
            return new user_model_1.User(Object.assign({}, userData.data(), { id: userData.id })).getData();
        });
    }
    changeEmail(user, body) {
        return __awaiter(this, void 0, void 0, function* () {
            body.email = body.email.trim();
            return yield this.userService.update(user, body);
        });
    }
    getOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const awaitUser = yield this.userService.getOne(id);
            const user = yield awaitUser.get();
            return new user_model_1.User(user.data()).getData();
        });
    }
    updateMe(user, body) {
        return __awaiter(this, void 0, void 0, function* () {
            if (body.email) {
                body.email = body.email.trim();
                const emailExists = yield this.userService.getOneByEmail(body.email);
                if (emailExists) {
                    throw new common_1.ForbiddenException(`That email currently exists. Please try a different email.`);
                }
            }
            return yield this.userService.update(user, body);
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const newData = yield this.userService.update(id, data);
            return new user_model_1.User(newData).getData();
        });
    }
    destroy(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userService.delete(id);
        });
    }
    deleteMe(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userService.delete(id);
        });
    }
    importIntegration(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userService.getOne(data);
            const existingData = yield user.get();
            user.update({
                integrations: {
                    github: Object.assign({}, existingData.data().integrations.github, { lastMigratedDate: new Date() }),
                },
            });
            return {
                success: true,
                message: 'Successfully updated the record.',
            };
        });
    }
    subscribe(id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('id', id);
            this.userService.update(id, { fcmPayload: body });
            try {
                return {
                    success: true,
                    message: 'Successfully subscribed.',
                };
            }
            catch (err) {
                console.error(err);
            }
        });
    }
    sendNotifications(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = JSON.stringify(body);
            const users = yield this.userService.getAllForPushNotifications();
            for (const user of users) {
                try {
                    yield webPush.sendNotification(JSON.parse(user.fcmPayload), payload);
                }
                catch (err) {
                    console.error(err);
                }
            }
            return {
                success: true,
                message: 'Successfully sent notifications.',
            };
        });
    }
};
__decorate([
    common_1.Post('login'),
    swagger_1.ApiResponse({ status: 200, description: `You've successfully logged in.` }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [credentials_dto_1.Credentials]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
__decorate([
    common_1.Post('register'),
    swagger_1.ApiCreatedResponse({
        description: 'The record has been successfully created.',
    }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [credentials_dto_1.Credentials]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "register", null);
__decorate([
    common_1.Get(),
    swagger_1.ApiResponse({
        status: 200,
        description: 'Successfully collected all user documents.',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAll", null);
__decorate([
    common_1.Post(),
    swagger_1.ApiCreatedResponse({
        description: 'The record has been successfully created.',
    }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "create", null);
__decorate([
    common_1.Get('me'),
    swagger_1.ApiBearerAuth(),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    __param(0, user_decorator_1.CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "me", null);
__decorate([
    common_1.Put('me/email'),
    swagger_1.ApiBearerAuth(),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    __param(0, user_decorator_1.CurrentUser()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "changeEmail", null);
__decorate([
    common_1.Get(':id'),
    swagger_1.ApiBearerAuth(),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getOne", null);
__decorate([
    common_1.Put('me'),
    swagger_1.ApiBearerAuth(),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    __param(0, user_decorator_1.CurrentUser()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateMe", null);
__decorate([
    common_1.Put(':id'),
    swagger_1.ApiBearerAuth(),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "update", null);
__decorate([
    common_1.Delete(':id'),
    swagger_1.ApiBearerAuth(),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "destroy", null);
__decorate([
    common_1.Delete('me'),
    swagger_1.ApiBearerAuth(),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    __param(0, user_decorator_1.CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteMe", null);
__decorate([
    common_1.Post('me/integrations/github/import'),
    swagger_1.ApiBearerAuth(),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    __param(0, user_decorator_1.CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "importIntegration", null);
__decorate([
    common_1.Post('subscribe'),
    swagger_1.ApiBearerAuth(),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    __param(0, user_decorator_1.CurrentUser()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "subscribe", null);
__decorate([
    common_1.Post('send'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "sendNotifications", null);
UserController = __decorate([
    swagger_1.ApiUseTags('Users'),
    common_1.Controller('api/rest/users'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map