import { Injectable, HttpService } from '@nestjs/common';
import { AbstractService } from '@shared/service';
import { DatabaseService } from '@db/database.service';
import { ClientRO } from './response/client.response';
import { Client } from './client.model';
import { ClientDto } from './dto/client.dto';
import { EStatus } from '@shared/enum';
import { Observable } from 'apollo-link';
import { AxiosResponse } from 'axios';

@Injectable()
export class ClientService extends AbstractService {
    constructor(db: DatabaseService, private readonly httpService: HttpService) {
        super(db, 'clients');
    }

    async getCollection() {
        const data = await super.getAll();
        let collection: ClientRO[] = [];
        data.forEach(datum => {
            const client = new Client(datum);
            collection.push(client.getData());
        });
        return collection;
    }

    async doesClientExist(data: any) {
        const clients = await this.getAll<Client>();
        if (!data.value) {
            data.value = data.label.toLowerCase().replace(/\W/g, '_');
        }
        if (data.integrations) {
            return clients.find(client => client.integration.id === data.integration.id);
        }
        return clients.find(client => client.value === data.value);
    }

    async create(data: ClientDto) {
        super.create(data);
        if (!data.value) {
            data.value = data.label.toLowerCase().replace(/\W/g, '_');
        }
        this.data.status = EStatus.Active;
        return this;
    }

    async update<ClientDto>(id, data: Partial<ClientDto>) {
        return await super.update(id, data);
    }
}
