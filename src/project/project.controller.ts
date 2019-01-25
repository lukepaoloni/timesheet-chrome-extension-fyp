import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { ProjectService } from './project.service';
import { ProjectDto } from './dto/project.dto';

@ApiUseTags('Projects')
@Controller('api/rest/projects')
export class ProjectController {

    constructor(private projectService: ProjectService) { }

    @Get()
    async getAll() {
        return await this.projectService.getAll();
    }

    @Post()
    async create(@Body() data: ProjectDto) {
        const project = await this.projectService.create(data);
        const save = await project.save();
        const newProject = await save.get();
        return newProject.data();
    }
}
