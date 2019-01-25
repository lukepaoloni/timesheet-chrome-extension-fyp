import { EStatus } from "@shared/enum";
import { ProjectRO } from './response/project.response';

export class Project {
    constructor(partial?: Partial<Project>) {
        Object.assign(this, partial);
    }
    id: string;
    name: string;
    client: string; // Change to client
    status: EStatus;

    getData(): ProjectRO {
        const { name, client } = this;
        const responseObject: ProjectRO = { name, client };

        return responseObject;
    }
}