import { ApiModelPropertyOptional } from '@nestjs/swagger';

export class Settings {
  @ApiModelPropertyOptional()
  weeklySubmissions?: boolean;

  @ApiModelPropertyOptional()
  weeklyUpdates?: boolean;

  @ApiModelPropertyOptional()
  enableNotifications?: boolean;

  @ApiModelPropertyOptional()
  dateTimeFormat?: boolean;
}
