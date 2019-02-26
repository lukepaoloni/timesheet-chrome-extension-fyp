import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
export class ClientTimesheetDto {
    @ApiModelProperty()
    label: string;
    @ApiModelPropertyOptional()
    value?: string;
}