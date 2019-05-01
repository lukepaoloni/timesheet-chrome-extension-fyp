import { Injectable } from '@nestjs/common';
import { AbstractService } from '../shared/service';
import { DatabaseService } from 'src/database/database.service';
import { TimesheetRO } from './response/timesheet.response';
import { Timesheet } from './timesheet.model';
import { TimesheetDto } from './dto/timesheet.dto';
import { EStatus } from '@shared/enum';

@Injectable()
export class TimesheetService extends AbstractService {
    constructor(db: DatabaseService) {
        super(db, 'timesheets');
    }

    async getAll(page?: number, limit = 25) {
        const timesheets = this.collection.orderBy('date');
        if (page && page > 0) {
            timesheets.startAt(limit * page - limit);
        }

        const timesheetData = await timesheets.get();
        return timesheetData.docs.map(doc => {
            return { ...doc.data(), id: doc.id } as any;
        });
    }

    async getCollection() {
        const data = await super.getAll();
        let collection: TimesheetRO[] = [];
        data.forEach(datum => {
            const project = new Timesheet(datum);
            collection.push(project.getData());
        });
        return collection;
    }

    async create(data: Partial<TimesheetDto>) {
        super.create({ ...data });
        return this;
    }

    async update<TimesheetDto>(id, data: Partial<TimesheetDto>) {
        return await super.update(id, data);
    }
}
