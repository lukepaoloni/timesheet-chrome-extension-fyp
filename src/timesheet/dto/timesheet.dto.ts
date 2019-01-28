import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { UserTimesheetDto } from './user-timesheet.dto';
import { ProjectTimesheetDto } from './project-timesheet.dto';
import { ClientTimesheetDto } from './client-timesheet.dto';
export class TimesheetDto {
    @ApiModelProperty()
    user: UserTimesheetDto;
    @ApiModelProperty()
    task: string;
    @ApiModelPropertyOptional()
    project?: ProjectTimesheetDto;
    @ApiModelProperty()
    client: ClientTimesheetDto;
    @ApiModelProperty()
    date: Date;
    @ApiModelProperty()
    duration: number;
}