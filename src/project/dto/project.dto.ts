import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { ClientDTO } from './client.dto';
export class ProjectDto {
    @ApiModelProperty()
    label: string;
    @ApiModelPropertyOptional()
    value?: string
    @ApiModelProperty()
    client: ClientDTO;
    @ApiModelProperty()
    clientId: string;
}