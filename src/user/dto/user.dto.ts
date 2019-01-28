import { ERole, EStatus } from '@shared/enum';
import { ApiModelProperty, ApiImplicitQuery } from '@nestjs/swagger';
export class UserDto {
    @ApiModelProperty()
    email: string;
    @ApiModelProperty()
    name: string;
    @ApiModelProperty()
    password: string;
    @ApiModelProperty({ enum: ERole })
    role: ERole;
    @ApiModelProperty({ enum: EStatus })
    status: EStatus;
}
