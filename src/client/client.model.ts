import { EStatus } from '../shared/enum/status.enum';
import { ClientRO } from './response/client.response';
import { AbstractModel } from '../shared/model';

export class Client extends AbstractModel<Client> {
    constructor(partial?: Partial<Client>) {
        super(partial);
    }
    id: string;
    name: string;
    status?: EStatus;
    getData(): ClientRO {
        const { name } = this;
        const responseObject: ClientRO = { name };

        return responseObject;
    }
}