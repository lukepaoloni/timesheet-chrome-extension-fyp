import { ProjectTimesheetDto } from './project-timesheet.dto';
import { ClientTimesheetDto } from './client-timesheet.dto';
import { UserTimesheetDto } from './user-timesheet.dto';
export declare class TimesheetDto {
    task: string;
    project?: ProjectTimesheetDto;
    client: ClientTimesheetDto;
    date: Date;
    duration: number;
    user: UserTimesheetDto;
}
