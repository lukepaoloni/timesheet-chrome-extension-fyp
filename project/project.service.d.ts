import { AbstractService } from '../shared/service';
import { DatabaseService } from 'src/database/database.service';
import { ProjectRO } from './response/project.response';
import { Project } from './project.model';
import { ProjectDto } from './dto/project.dto';
export declare class ProjectService extends AbstractService {
    constructor(db: DatabaseService);
    getCollection(): Promise<ProjectRO[]>;
    getAllByClient(clientId: any): Promise<{
        id: string;
    }[]>;
    doesProjectExist(data: any): Promise<Project>;
    create(data: ProjectDto): Promise<this>;
    update<ProjectDto>(id: any, data: Partial<ProjectDto>): Promise<import("firebase").firestore.DocumentData>;
}
