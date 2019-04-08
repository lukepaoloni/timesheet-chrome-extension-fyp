import { ERole, EStatus } from '@shared/enum';
import { ApiModelPropertyOptional } from '@nestjs/swagger';
import { Integrations } from '../user.model';
import { Settings } from '@user/settings';
export class UserDto {
  @ApiModelPropertyOptional()
  email?: string;
  @ApiModelPropertyOptional()
  name?: string;
  @ApiModelPropertyOptional()
  password?: string;
  @ApiModelPropertyOptional({ enum: ERole })
  role?: ERole;
  @ApiModelPropertyOptional({ enum: EStatus })
  status?: EStatus;
  @ApiModelPropertyOptional()
  integrations?: Integrations;
  @ApiModelPropertyOptional()
  settings?: Settings;
}
