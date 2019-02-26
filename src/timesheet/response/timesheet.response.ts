import { User } from '@user/user.model';
import { Project } from '@project/project.model';
import { Client } from '@client/client.model';
import { UserTimesheetDto } from '../dto/user-timesheet.dto';
export interface TimesheetRO {
    id: string;
    task: string;
    project?: Project;
    client: Client;
    date: Date;
    duration: number;
    user: UserTimesheetDto
}