import { AbstractService } from '../shared/service';
import { DatabaseService } from '@db/database.service';
import { ProjectRO } from './response/project.response';
import { ProjectDto } from './dto/project.dto';
export declare class ProjectService extends AbstractService {
    constructor(db: DatabaseService);
    getCollection(): Promise<ProjectRO[]>;
    getAllByClient(clientId: any): Promise<{
        id: string;
    }[]>;
    create(data: ProjectDto): Promise<this>;
    update<ProjectDto>(id: any, data: Partial<ProjectDto>): Promise<{
        success: boolean;
        message?: undefined;
    } | {
        success: boolean;
        message: string;
    }>;
}
