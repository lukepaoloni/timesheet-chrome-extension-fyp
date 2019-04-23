import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { UserModule } from '@user/user.module';
import { UserService } from '@user/user.service';
import axios from 'axios';
import config from '@app/config';

describe('Users', () => {
    let app: INestApplication;
    let userService = { getAll: () => [] };
    let user = {
        email: 'test@user.com',
        password: 'password',
        token: '',
    };

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            imports: [UserModule],
        })
            .overrideProvider(UserService)
            .useValue(userService)
            .compile();

        app = module.createNestApplication();
        await app.init();
    });

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

    afterAll(async () => {
        await app.close();
    });
});
