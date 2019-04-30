import { ClientService } from './client.service';
import { ClientDto } from './dto/client.dto';
import { Client } from '@client/client.model';
export declare class ClientController {
    private clientService;
    constructor(clientService: ClientService);
    getAll(): Promise<Client[]>;
    createMultiple(body: any): Promise<{
        errors: any[];
        successes: any[];
    }>;
    create(data: ClientDto): Promise<{
        success: boolean;
        message: string;
        id: string;
        client: import("firebase").firestore.DocumentData;
    }>;
    update(id: string, data: Partial<ClientDto>): Promise<import("firebase").firestore.DocumentData>;
    destroy(id: string): Promise<{
        success: boolean;
        message?: undefined;
    } | {
        success: boolean;
        message: string;
    }>;
}
