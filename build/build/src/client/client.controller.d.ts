import { ClientService } from './client.service';
import { ClientDto } from './dto/client.dto';
export declare class ClientController {
    private clientService;
    constructor(clientService: ClientService);
    getAll(): Promise<{
        id: string;
    }[]>;
    create(data: ClientDto): Promise<{
        success: boolean;
        message: string;
        client: {
            id: string;
        };
    }>;
    update(id: string, data: Partial<ClientDto>): Promise<{
        success: boolean;
        message?: undefined;
    } | {
        success: boolean;
        message: string;
    }>;
    destroy(id: string): Promise<{
        success: boolean;
        message?: undefined;
    } | {
        success: boolean;
        message: string;
    }>;
}
