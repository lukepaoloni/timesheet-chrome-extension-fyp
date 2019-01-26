import { ApiModelProperty } from '@nestjs/swagger';
export class ClientDto {
    @ApiModelProperty()
    name: string;
}