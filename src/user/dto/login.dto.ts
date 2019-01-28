import { ERole, EStatus } from '@shared/enum';
import { ApiModelProperty, ApiImplicitQuery } from '@nestjs/swagger';
export class LoginDto {
    @ApiModelProperty()
    email: string;
    @ApiModelProperty()
    name: string;
}
