import { Injectable } from '@nestjs/common';
import { AbstractService } from '../shared/service';
import { DatabaseService } from '@db/database.service';
import { ProjectRO } from './response/project.response';
import { Project } from './project.model';
import { ProjectDto } from './dto/project.dto';
import { EStatus } from '../shared/enum/status.enum';

@Injectable()
export class ProjectService extends AbstractService {
    constructor(db: DatabaseService) {
        super(db, 'projects');
    }

    async getCollection() {
        const data = await super.getAll();
        let collection: ProjectRO[] = [];
        data.forEach(datum => {
            const project = new Project(datum);
            collection.push(project.getData());
        });
        return collection;
    }

    async create(data: ProjectDto) {
        this.data = data;
        this.data.status = EStatus.Active;
        this.data.createdAt = new Date()
        this.data.updatedAt = new Date()
        return this;
    }

    async update(id, data: Partial<ProjectDto>) {
        return await super.update(id, { ...data, updatedAt: new Date() });
    }
}
