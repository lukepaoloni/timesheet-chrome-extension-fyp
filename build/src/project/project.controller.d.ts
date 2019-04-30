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
        id?: undefined;
    } | {
        success: boolean;
        message: string;
        id: string;
        project: import("./project.model").Project & ProjectDto;
    }>;
    update(id: string, data: Partial<ProjectDto>): Promise<import("firebase").firestore.DocumentData>;
    delete(id: string): Promise<{
        success: boolean;
        message?: undefined;
    } | {
        success: boolean;
        message: string;
    }>;
}
