import { HttpService } from '@nestjs/common';
import { AbstractService } from '@shared/service';
import { DatabaseService } from '@db/database.service';
import { ClientRO } from './response/client.response';
import { ClientDto } from './dto/client.dto';
export declare class ClientService extends AbstractService {
    private readonly httpService;
    constructor(db: DatabaseService, httpService: HttpService);
    getCollection(): Promise<ClientRO[]>;
    create(data: ClientDto): Promise<this>;
    update<ClientDto>(id: any, data: Partial<ClientDto>): Promise<{
        success: boolean;
        message?: undefined;
    } | {
        success: boolean;
        message: string;
    }>;
}
