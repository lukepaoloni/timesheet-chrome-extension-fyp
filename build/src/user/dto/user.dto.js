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
Object.defineProperty(exports, "__esModule", { value: true });
const enum_1 = require("@shared/enum");
const swagger_1 = require("@nestjs/swagger");
const user_model_1 = require("../user.model");
const settings_1 = require("@user/settings");
class UserDto {
}
__decorate([
    swagger_1.ApiModelPropertyOptional(),
    __metadata("design:type", String)
], UserDto.prototype, "email", void 0);
__decorate([
    swagger_1.ApiModelPropertyOptional(),
    __metadata("design:type", String)
], UserDto.prototype, "name", void 0);
__decorate([
    swagger_1.ApiModelPropertyOptional(),
    __metadata("design:type", String)
], UserDto.prototype, "password", void 0);
__decorate([
    swagger_1.ApiModelPropertyOptional({ enum: enum_1.ERole }),
    __metadata("design:type", String)
], UserDto.prototype, "role", void 0);
__decorate([
    swagger_1.ApiModelPropertyOptional({ enum: enum_1.EStatus }),
    __metadata("design:type", String)
], UserDto.prototype, "status", void 0);
__decorate([
    swagger_1.ApiModelPropertyOptional(),
    __metadata("design:type", user_model_1.Integrations)
], UserDto.prototype, "integrations", void 0);
__decorate([
    swagger_1.ApiModelPropertyOptional(),
    __metadata("design:type", settings_1.Settings)
], UserDto.prototype, "settings", void 0);
exports.UserDto = UserDto;
//# sourceMappingURL=user.dto.js.map