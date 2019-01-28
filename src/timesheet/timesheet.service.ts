import { Injectable } from '@nestjs/common';
import { AbstractService } from '../shared/service';
import { DatabaseService } from '@db/database.service';
import { TimesheetRO } from './response/timesheet.response';
import { Timesheet } from './timesheet.model';
import { TimesheetDto } from './dto/timesheet.dto';
import { EStatus } from '@shared/enum';

@Injectable()
export class TimesheetService extends AbstractService {
    constructor(db: DatabaseService) {
        super(db, 'timesheets');
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

    async create(data: TimesheetDto) {
        super.create({ ...data, status: EStatus.Active });
        return this;
    }

    async update(id, data: Partial<TimesheetDto>) {
        return await super.update(id, data);
    }
}
