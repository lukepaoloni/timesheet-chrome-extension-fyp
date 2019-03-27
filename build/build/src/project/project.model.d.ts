import { EStatus } from "@shared/enum";
import { ProjectRO } from './response/project.response';
import { AbstractModel } from '@shared/model';
import { ClientDTO } from './dto/client.dto';
export declare class Project extends AbstractModel<Project> {
    constructor(partial?: Partial<Project>);
    id: string;
    label: string;
    value: string;
    client: ClientDTO;
    clientId: string;
    status: EStatus;
    getData(): ProjectRO;
}
