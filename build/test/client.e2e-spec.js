"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const request = require("supertest");
const client_module_1 = require("@client/client.module");
const client_service_1 = require("@client/client.service");
describe('Clients', () => {
    let app;
    let clientService = { getAll: () => [] };
    let user = {
        email: 'test@user.com',
        password: 'password',
        token: '',
    };
    beforeAll(() => __awaiter(this, void 0, void 0, function* () {
        const module = yield testing_1.Test.createTestingModule({
            imports: [client_module_1.ClientModule],
        })
            .overrideProvider(client_service_1.ClientService)
            .useValue(clientService)
            .compile();
        app = module.createNestApplication();
        yield app.init();
    }));
    it(`/GET clients`, () => {
        return request(app.getHttpServer())
            .get('/api/rest/clients')
            .set('Content-Type', 'application/json')
            .expect(200)
            .expect(clientService.getAll());
    });
    afterAll(() => __awaiter(this, void 0, void 0, function* () {
        yield app.close();
    }));
});
//# sourceMappingURL=client.e2e-spec.js.map