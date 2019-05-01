import { Module } from '@nestjs/common';
import { TimesheetService } from './timesheet.service';
import { TimesheetController } from './timesheet.controller';
import { UserModule } from 'src/user/user.module';

@Module({
    imports: [UserModule],
    providers: [TimesheetService],
    controllers: [TimesheetController],
})
export class TimesheetModule {}
