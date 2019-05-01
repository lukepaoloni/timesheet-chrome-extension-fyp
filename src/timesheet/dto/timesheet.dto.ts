import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { ProjectTimesheetDto } from './project-timesheet.dto';
import { ClientTimesheetDto } from './client-timesheet.dto';
import { UserTimesheetDto } from './user-timesheet.dto';
export class TimesheetDto {
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
    user: UserTimesheetDto;
}
