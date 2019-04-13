import { EStatus } from '../shared/enum/status.enum';
import { ClientRO } from './response/client.response';
import { AbstractModel } from '../shared/model';
import { ApiModelProperty } from '@nestjs/swagger';

export class Client extends AbstractModel<Client> {
    constructor(partial?: Partial<Client>) {
        super(partial);
    }
    @ApiModelProperty()
    id: string;
    @ApiModelProperty()
    label: string;
    value: string;
    status?: EStatus;
    integration?: any;

    getData(): ClientRO {
        const { label, value } = this;
        const responseObject: ClientRO = { label, value };

        return responseObject;
    }
}
