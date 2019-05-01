import { ApiModelProperty } from '@nestjs/swagger';
export class Credentials {
    @ApiModelProperty()
    email: string;
    @ApiModelProperty()
    password: string;
}
