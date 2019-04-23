import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { ClientModule } from '@client/client.module';
import { ClientService } from '@client/client.service';
import axios from 'axios';
import config from '@app/config';

describe('Clients', () => {
    let app: INestApplication;
    let clientService = { getAll: () => [] };
    let user = {
        email: 'test@user.com',
        password: 'password',
        token: '',
    };

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            imports: [ClientModule],
        })
            .overrideProvider(ClientService)
            .useValue(clientService)
            .compile();

        app = module.createNestApplication();
        await app.init();
        // const {
        //     data: { token },
        // } = await axios.post(`${config.APP_DOMAIN}/api/rest/users/login`, {
        //     email: user.email,
        //     password: user.password
        // });
        // user.token = token;
    });

    it(`/GET clients`, () => {
        return request(app.getHttpServer())
            .get('/api/rest/clients')
            .set('Content-Type', 'application/json')
            .expect(200)
            .expect(clientService.getAll());
    });

    afterAll(async () => {
        await app.close();
    });
});
