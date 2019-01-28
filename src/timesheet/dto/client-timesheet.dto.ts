import { ApiModelProperty } from '@nestjs/swagger';
export class ClientTimesheetDto {
    @ApiModelProperty()
    id: string;
    @ApiModelProperty()
    name: string;
}