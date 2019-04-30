import { EStatus } from '@shared/enum';
import { ProjectRO } from './response/project.response';
import { Client } from '@client/client.model';
import { AbstractModel } from '@shared/model';
export declare class Project extends AbstractModel<Project> {
    constructor(partial?: Partial<Project>);
    id: string;
    label: string;
    value: string;
    client: Client;
    status: EStatus;
    integration?: any;
    getData(): ProjectRO;
}
