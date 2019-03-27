import { EStatus } from '../shared/enum/status.enum';
import { ClientRO } from './response/client.response';
import { AbstractModel } from '../shared/model';
export declare class Client extends AbstractModel<Client> {
    constructor(partial?: Partial<Client>);
    id: string;
    label: string;
    value: string;
    status?: EStatus;
    getData(): ClientRO;
}
