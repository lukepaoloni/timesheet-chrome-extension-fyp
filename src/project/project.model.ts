import { EStatus } from "@shared/enum";
import { ProjectRO } from './response/project.response';
import { Client } from '@client/client.model';
import { AbstractModel } from '@shared/model';

export class Project extends AbstractModel<Project> {
    constructor(partial?: Partial<Project>) {
        super(partial)
    }
    id: string;
    name: string;
    client: Client;
    status: EStatus;

    getData(): ProjectRO {
        const { name, client } = this;
        const responseObject: ProjectRO = { name, client };

        return responseObject;
    }
}