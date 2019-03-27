import { ProjectService } from './project.service';
import { ProjectDto } from './dto/project.dto';
export declare class ProjectController {
    private projectService;
    constructor(projectService: ProjectService);
    getAll(clientId: string): Promise<{
        id: string;
    }[]>;
    create(data: ProjectDto): Promise<{
        success: boolean;
        message: string;
        project: {
            id: string;
        };
    }>;
    update(id: string, data: Partial<ProjectDto>): Promise<{
        success: boolean;
        message?: undefined;
    } | {
        success: boolean;
        message: string;
    }>;
    delete(id: string): Promise<{
        success: boolean;
        message?: undefined;
    } | {
        success: boolean;
        message: string;
    }>;
}
