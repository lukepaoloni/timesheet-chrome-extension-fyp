import { AbstractService } from '../shared/service';
import { DatabaseService } from 'src/database/database.service';
import { TimesheetRO } from './response/timesheet.response';
import { TimesheetDto } from './dto/timesheet.dto';
export declare class TimesheetService extends AbstractService {
    constructor(db: DatabaseService);
    getAll(page?: number, limit?: number): Promise<any[]>;
    getCollection(): Promise<TimesheetRO[]>;
    create(data: Partial<TimesheetDto>): Promise<this>;
    update<TimesheetDto>(id: any, data: Partial<TimesheetDto>): Promise<import("firebase").firestore.DocumentData>;
}
