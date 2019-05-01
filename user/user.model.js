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
const config_1 = require("../app/config");
const bcrypt = require("bcrypt");
const model_1 = require("../shared/model");
const swagger_1 = require("@nestjs/swagger");
class IntegrationDto {
}
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], IntegrationDto.prototype, "id", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], IntegrationDto.prototype, "token", void 0);
class Integrations {
}
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", IntegrationDto)
], Integrations.prototype, "google", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", IntegrationDto)
], Integrations.prototype, "github", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", IntegrationDto)
], Integrations.prototype, "bitbucket", void 0);
exports.Integrations = Integrations;
class User extends model_1.AbstractModel {
    constructor(partial) {
        super(partial);
    }
    hashPassword() {
        return __awaiter(this, void 0, void 0, function* () {
            this.password = yield bcrypt.hash(this.password, config_1.default.SALT_ROUNDS);
        });
    }
    comparePassword(attempt) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield bcrypt.compare(attempt, this.password);
        });
    }
    getData() {
        const { id, name, email, role, status, integrations, settings } = this;
        const responseObject = {
            id,
            name,
            email,
            role,
            status,
            integrations,
            settings,
        };
        return responseObject;
    }
}
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    swagger_1.ApiModelPropertyOptional(),
    __metadata("design:type", Object)
], User.prototype, "fcmPayload", void 0);
exports.User = User;
//# sourceMappingURL=user.model.js.map