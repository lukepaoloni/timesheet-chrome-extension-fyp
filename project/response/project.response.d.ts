import { ClientDTO } from '../dto/client.dto';
export interface ProjectRO {
    label: string;
    value: string;
    client: ClientDTO;
}
