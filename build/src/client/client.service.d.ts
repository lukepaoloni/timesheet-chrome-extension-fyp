import { HttpService } from '@nestjs/common';
import { AbstractService } from '@shared/service';
import { DatabaseService } from '@db/database.service';
import { ClientRO } from './response/client.response';
import { Client } from './client.model';
import { ClientDto } from './dto/client.dto';
export declare class ClientService extends AbstractService {
    private readonly httpService;
    constructor(db: DatabaseService, httpService: HttpService);
    getCollection(): Promise<ClientRO[]>;
    doesClientExist(data: any): Promise<Client>;
    create(data: ClientDto): Promise<this>;
    update<ClientDto>(id: any, data: Partial<ClientDto>): Promise<import("firebase").firestore.DocumentData>;
}
