import { TimesheetService } from './timesheet.service';
import { TimesheetDto } from './dto/timesheet.dto';
import { UserService } from '@user/user.service';
export declare class TimesheetController {
    private readonly timesheetService;
    private readonly userService;
    constructor(timesheetService: TimesheetService, userService: UserService);
    getAll(): Promise<{
        id: string;
    }[]>;
    create(user: any, data: TimesheetDto): Promise<import("firebase").firestore.DocumentData>;
    update(id: string, data: Partial<TimesheetDto>): Promise<{
        success: boolean;
        message?: undefined;
    } | {
        success: boolean;
        message: string;
    }>;
    delete(id: string): Promise<{
        success: boolean;
        message?: undefined;
    } | {
        success: boolean;
        message: string;
    }>;
}
