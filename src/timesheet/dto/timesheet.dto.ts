import { User } from '@user/user.model';
import { Project } from '@project/project.model';
import { Client } from '@client/client.model';
import { ApiModelProperty } from '@nestjs/swagger';
export class TimesheetDto {
    @ApiModelProperty()
    user: User;
    @ApiModelProperty()
    task: string;
    @ApiModelProperty()
    project?: Project;
    @ApiModelProperty()
    client: Client;
    @ApiModelProperty()
    date: Date;
    @ApiModelProperty()
    duration: number;
}