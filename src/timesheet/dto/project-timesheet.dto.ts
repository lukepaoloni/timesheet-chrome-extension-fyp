import { ApiModelPropertyOptional, ApiModelProperty } from '@nestjs/swagger';
export class ProjectTimesheetDto {
    @ApiModelProperty()
    label: string;
    @ApiModelPropertyOptional()
    value?: string;
}
