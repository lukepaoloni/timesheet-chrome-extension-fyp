import { EStatus } from "@shared/enum";
import { ProjectRO } from './response/project.response';
import { Client } from '@client/client.model';
import { AbstractModel } from '@shared/model';
import { ClientDTO } from './dto/client.dto';

export class Project extends AbstractModel<Project> {
    constructor(partial?: Partial<Project>) {
        super(partial)
    }
    id: string;
    label: string;
    value: string;
    client: ClientDTO;
    clientId: string;
    status: EStatus;

    getData(): ProjectRO {
        const { label, value, client, clientId } = this;
        const responseObject: ProjectRO = { label, value, client, clientId };

        return responseObject;
    }
}