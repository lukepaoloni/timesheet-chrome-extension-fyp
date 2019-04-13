import { EStatus } from '@shared/enum';
import { ProjectRO } from './response/project.response';
import { Client } from '@client/client.model';
import { AbstractModel } from '@shared/model';
import { ClientDTO } from './dto/client.dto';

export class Project extends AbstractModel<Project> {
    constructor(partial?: Partial<Project>) {
        super(partial);
    }
    id: string;
    label: string;
    value: string;
    client: Client;
    status: EStatus;
    integration?: any;

    getData(): ProjectRO {
        const { label, value, client } = this;
        const responseObject: ProjectRO = { label, value, client };

        return responseObject;
    }
}
