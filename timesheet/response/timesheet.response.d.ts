import { Project } from 'src/project/project.model';
import { Client } from 'src/client/client.model';
import { UserTimesheetDto } from '../dto/user-timesheet.dto';
export interface TimesheetRO {
    id: string;
    task: string;
    project?: Project;
    client: Client;
    date: Date;
    duration: number;
    user: UserTimesheetDto;
}
