import { AbstractModel } from '@shared/model';
import { User } from '../user/user.model';
import { Project } from '@project/project.model';
import { Client } from '../client/client.model';
import { EStatus } from './enums/status';
import { TimesheetRO } from './response/timesheet.response';
import { UserTimesheetDto } from './dto/user-timesheet.dto';
export class Timesheet extends AbstractModel<Timesheet> {
    constructor(partial?: Partial<Timesheet>) {
        super(partial);
    }
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
    getData(): TimesheetRO {
        const { id, user, task, project, client, date, duration } = this;
        const responseObject: TimesheetRO = { id, user, task, project, client, date, duration };

        return responseObject;
    }
}
