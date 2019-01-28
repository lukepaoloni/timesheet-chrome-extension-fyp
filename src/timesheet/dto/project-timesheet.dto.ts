import { ApiModelPropertyOptional } from '@nestjs/swagger';
export class ProjectTimesheetDto {
    @ApiModelPropertyOptional()
    id?: string;
    @ApiModelPropertyOptional()
    name?: string;
}