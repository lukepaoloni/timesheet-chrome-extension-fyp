import { Client } from '../../client/client.model';
import { ApiModelProperty } from '@nestjs/swagger';
export class ProjectDto {
    @ApiModelProperty()
    name: string;
    @ApiModelProperty()
    client: Client;
}