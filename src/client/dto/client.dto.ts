import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
export class ClientDto {
    @ApiModelProperty()
    label: string;
    @ApiModelPropertyOptional()
    value?: string;
    @ApiModelPropertyOptional()
    integrations: any;
}
