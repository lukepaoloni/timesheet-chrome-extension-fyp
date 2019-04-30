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
const client_service_1 = require("./client.service");
const client_dto_1 = require("./dto/client.dto");
const passport_1 = require("@nestjs/passport");
let ClientController = class ClientController {
    constructor(clientService) {
        this.clientService = clientService;
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.clientService.getAll();
        });
    }
    createMultiple(body) {
        return __awaiter(this, void 0, void 0, function* () {
            let errors = [];
            let successes = [];
            for (const data of body) {
                try {
                    const clientExists = yield this.clientService.doesClientExist(data);
                    if (!clientExists) {
                        const client = yield this.clientService.create(data);
                        const save = yield client.save();
                        const newClient = yield save.get();
                        successes.push({
                            success: true,
                            message: `You've successfully created ${newClient.data().label}.`,
                            id: newClient.id,
                        });
                    }
                    const updatedClient = Object.assign(clientExists, data);
                    const id = updatedClient.id;
                    delete updatedClient.id;
                    yield this.clientService.update(id, updatedClient);
                    successes.push({
                        success: true,
                        message: `You've successfully updated ${updatedClient.label}`,
                        id,
                    });
                }
                catch (err) {
                    if (err) {
                        errors.push(err);
                    }
                }
            }
            return {
                errors,
                successes,
            };
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const clientExists = yield this.clientService.doesClientExist(data);
            if (!clientExists) {
                const client = yield this.clientService.create(data);
                const save = yield client.save();
                const newClient = yield save.get();
                return {
                    success: true,
                    message: `You've successfully created a client.`,
                    id: newClient.id,
                    client: newClient.data(),
                };
            }
            const updatedClient = Object.assign(clientExists, data);
            const id = updatedClient.id;
            delete updatedClient.id;
            yield this.clientService.update(id, updatedClient);
            return {
                success: true,
                message: `You've successfully updated ${updatedClient.label}`,
                id,
                client: updatedClient,
            };
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.clientService.update(id, data);
        });
    }
    destroy(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.clientService.delete(id);
        });
    }
};
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ClientController.prototype, "getAll", null);
__decorate([
    common_1.Post('many'),
    swagger_1.ApiBearerAuth(),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ClientController.prototype, "createMultiple", null);
__decorate([
    common_1.Post(),
    swagger_1.ApiBearerAuth(),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [client_dto_1.ClientDto]),
    __metadata("design:returntype", Promise)
], ClientController.prototype, "create", null);
__decorate([
    common_1.Put(':id'),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ClientController.prototype, "update", null);
__decorate([
    common_1.Delete(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ClientController.prototype, "destroy", null);
ClientController = __decorate([
    swagger_1.ApiUseTags('Clients'),
    common_1.Controller('api/rest/clients'),
    __metadata("design:paramtypes", [client_service_1.ClientService])
], ClientController);
exports.ClientController = ClientController;
//# sourceMappingURL=client.controller.js.map