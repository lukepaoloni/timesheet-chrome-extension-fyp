import { TimesheetService } from './timesheet.service';
import { TimesheetDto } from './dto/timesheet.dto';
import { UserService } from 'src/user/user.service';
export declare class TimesheetController {
    private readonly timesheetService;
    private readonly userService;
    constructor(timesheetService: TimesheetService, userService: UserService);
    getAll(id: any, page?: number, limit?: number): Promise<any[]>;
    create(id: string, data: TimesheetDto): Promise<{
        success: boolean;
        message: string;
        timesheet: {
            id: string;
        };
    }>;
    update(id: string, data: Partial<TimesheetDto>): Promise<import("firebase").firestore.DocumentData>;
    delete(id: string): Promise<{
        success: boolean;
        message?: undefined;
    } | {
        success: boolean;
        message: string;
    }>;
}
