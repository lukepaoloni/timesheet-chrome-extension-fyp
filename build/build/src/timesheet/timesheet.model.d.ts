import { AbstractModel } from '@shared/model';
import { Project } from '@project/project.model';
import { Client } from '../client/client.model';
import { EStatus } from '../shared/enum/status.enum';
import { TimesheetRO } from './response/timesheet.response';
import { UserTimesheetDto } from './dto/user-timesheet.dto';
export declare class Timesheet extends AbstractModel<Timesheet> {
    constructor(partial?: Partial<Timesheet>);
    id: string;
    user: UserTimesheetDto;
    task: string;
    project?: Project;
    client: Client;
    date: Date;
    duration: number;
    status: EStatus;
    createdAt: Date;
    updatedAt: Date;
    getData(): TimesheetRO;
}
