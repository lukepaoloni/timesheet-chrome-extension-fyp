import { Injectable, UnprocessableEntityException } from '@nestjs/common';
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

    async getAllByClient(clientId) {
        if (!clientId) {
            throw new UnprocessableEntityException('You must specify a client ID as a parameter.');
        }
        const collection = await this.collection.where('clientId', '==', clientId).get();
        return collection.docs.map(doc => {
            return { ...doc.data(), id: doc.id };
        });
    }

    async doesProjectExist(data: any) {
        const projects = await this.getAll<Project>();
        if (!data.value) {
            data.value = data.label.toLowerCase().replace(/\W/g, '_');
        }
        if (data.integrations) {
            return projects.find(project => project.integration.id === data.integration.id);
        }
        return projects.find(project => project.value === data.value);
    }

    async create(data: ProjectDto) {
        if (!data.value) {
            data.value = data.label.toLowerCase().replace(/\W/g, '_');
        }
        this.data = data;
        this.data.status = EStatus.Active;
        return this;
    }

    async update<ProjectDto>(id, data: Partial<ProjectDto>) {
        return await super.update(id, data);
    }
}
