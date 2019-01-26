import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { ClientModule } from '@client/client.module';
import { ClientService } from '@client/client.service';

describe('Clients', () => {
    let app: INestApplication;
    let clientService = { getAll: () => [] };

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            imports: [ClientModule]
        })
            .overrideProvider(ClientService)
            .useValue(clientService)
            .compile();

        app = module.createNestApplication();
        await app.init();
    });

    it(`/GET clients`, () => {
        return request(app.getHttpServer())
            .get('/api/rest/clients')
            .expect(200)
            .expect(clientService.getAll())
    });

    afterAll(async () => {
        await app.close();
    })
});