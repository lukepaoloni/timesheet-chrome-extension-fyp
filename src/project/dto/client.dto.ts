import { ApiModelPropertyOptional } from '@nestjs/swagger';

export class ClientDTO {
    @ApiModelPropertyOptional()
    label: string;
    @ApiModelPropertyOptional()
    value?: string;
}
