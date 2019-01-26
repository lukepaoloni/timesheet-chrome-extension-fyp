import { AbstractModel } from '@shared/model';
import { User } from '../user/user.model';
import Project from 'ts-simple-ast';
import { Client } from '../client/client.model';
import { EStatus } from '../shared/enum/status.enum';
import { TimesheetRO } from './response/timesheet.response';
export class Timesheet extends AbstractModel<Timesheet> {
    constructor(partial?: Partial<Timesheet>) {
        super(partial);
    }
    id: string;
    user: User;
    task: string;
    project?: Project;
    client: Client;
    date: Date;
    duration: number;
    status: EStatus;
    createdAt: Date;
    updatedAt: Date;
    getData(): TimesheetRO {
        const { user, task, project, client, date, duration } = this;
        const responseObject: TimesheetRO = { user, task, project, client, date, duration };

        return responseObject;
    }
}