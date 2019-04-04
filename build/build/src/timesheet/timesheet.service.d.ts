import { AbstractService } from '../shared/service';
import { DatabaseService } from '@db/database.service';
import { TimesheetRO } from './response/timesheet.response';
import { TimesheetDto } from './dto/timesheet.dto';
export declare class TimesheetService extends AbstractService {
    constructor(db: DatabaseService);
    getCollection(): Promise<TimesheetRO[]>;
    create(data: Partial<TimesheetDto>): Promise<this>;
    update<TimesheetDto>(id: any, data: Partial<TimesheetDto>): Promise<{
        success: boolean;
        message?: undefined;
    } | {
        success: boolean;
        message: string;
    }>;
}
