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
const user_module_1 = require("@user/user.module");
const user_service_1 = require("@user/user.service");
describe('Users', () => {
    let app;
    let userService = { getAll: () => [] };
    let user = {
        email: 'test@user.com',
        password: 'password',
        token: '',
    };
    beforeAll(() => __awaiter(this, void 0, void 0, function* () {
        const module = yield testing_1.Test.createTestingModule({
            imports: [user_module_1.UserModule],
        })
            .overrideProvider(user_service_1.UserService)
            .useValue(userService)
            .compile();
        app = module.createNestApplication();
        yield app.init();
    }));
    it(`/GET users`, () => {
        return request(app.getHttpServer())
            .get('/api/rest/users')
            .expect(200)
            .expect(userService.getAll());
    });
    it(`/POST register`, () => {
        return request(app.getHttpServer())
            .post('api/rest/users/register')
            .set('Accept', 'application/json')
            .send({
            email: user.email,
            password: user.password,
        })
            .expect(201)
            .expect(({ body }) => {
            user.token = body.token;
            expect(body.token).toBeDefined();
            expect(body.email).toEqual(user.email);
            expect(body.expires).toBeDefined();
        });
    });
    it(`/POST login`, () => {
        return request(app.getHttpServer())
            .post('/api/rest/users/login')
            .set('Accept', 'application/json')
            .send({
            email: user.email,
            password: user.password,
        })
            .expect(201)
            .expect(({ body }) => {
            user.token = body.token;
            expect(body.token).toBeDefined();
            expect(body.email).toEqual(user.email);
            expect(body.expires).toBeDefined();
        });
    });
    it(`/GET me`, () => {
        return request(app.getHttpServer())
            .get('/api/rest/users/me')
            .set('Authoization', `Bearer ${user.token}`)
            .expect(200)
            .expect(({ body }) => {
            expect(body.id).toBeDefined();
            expect(body.email).toBeDefined();
            expect(body.role).toBeDefined();
        });
    });
    it(`/DELETE me`, () => {
        return request(app.getHttpServer())
            .delete('/api/rest/users/me')
            .expect(202)
            .expect(({ body }) => {
            expect(body.success).toBeTruthy();
        });
    });
    afterAll(() => __awaiter(this, void 0, void 0, function* () {
        yield app.close();
    }));
});
//# sourceMappingURL=user.e2e-spec.js.map