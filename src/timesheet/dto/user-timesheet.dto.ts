import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
export class UserTimesheetDto {
    @ApiModelPropertyOptional()
    id?: string;
    @ApiModelPropertyOptional()
    name?: string;
    @ApiModelProperty()
    email: string;
}