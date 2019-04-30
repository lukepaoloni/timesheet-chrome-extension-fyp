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
const service_1 = require("@shared/service");
const database_service_1 = require("@db/database.service");
const client_model_1 = require("./client.model");
const enum_1 = require("@shared/enum");
let ClientService = class ClientService extends service_1.AbstractService {
    constructor(db, httpService) {
        super(db, 'clients');
        this.httpService = httpService;
    }
    getCollection() {
        const _super = Object.create(null, {
            getAll: { get: () => super.getAll }
        });
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield _super.getAll.call(this);
            let collection = [];
            data.forEach(datum => {
                const client = new client_model_1.Client(datum);
                collection.push(client.getData());
            });
            return collection;
        });
    }
    doesClientExist(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const clients = yield this.getAll();
            if (!data.value) {
                data.value = data.label.toLowerCase().replace(/\W/g, '_');
            }
            if (data.integrations) {
                return clients.find(client => client.integration.id === data.integration.id);
            }
            return clients.find(client => client.value === data.value);
        });
    }
    create(data) {
        const _super = Object.create(null, {
            create: { get: () => super.create }
        });
        return __awaiter(this, void 0, void 0, function* () {
            _super.create.call(this, data);
            if (!data.value) {
                data.value = data.label.toLowerCase().replace(/\W/g, '_');
            }
            this.data.status = enum_1.EStatus.Active;
            return this;
        });
    }
    update(id, data) {
        const _super = Object.create(null, {
            update: { get: () => super.update }
        });
        return __awaiter(this, void 0, void 0, function* () {
            return yield _super.update.call(this, id, data);
        });
    }
};
ClientService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService, common_1.HttpService])
], ClientService);
exports.ClientService = ClientService;
//# sourceMappingURL=client.service.js.map