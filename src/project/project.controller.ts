import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { ProjectService } from './project.service';
import { ProjectDto } from './dto/project.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiUseTags('Projects')
@Controller('api/rest/projects')
export class ProjectController {
    constructor(private projectService: ProjectService) { }

    @Get()
    async getAll(@Query('clientId') clientId: string) {
        return await this.projectService.getAllByClient(clientId);
    }

    @Post()
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    async create(@Body() data: ProjectDto) {
        const project = await this.projectService.create(data);
        const save = await project.save();
        const newProject = await save.get();
        return {
            success: true,
            message: `You've successfully created a project.`,
            project: {
                id: newProject.id,
                ...newProject.data(),
            }
        };
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() data: Partial<ProjectDto>) {
        return await this.projectService.update(id, data);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return await this.projectService.delete(id);
    }
}
