import { Controller, Param, Body, Put, Delete, Post, Get, UseGuards } from '@nestjs/common';
import { TimesheetService } from './timesheet.service';
import { TimesheetDto } from './dto/timesheet.dto';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '@user/decorators/user.decorator';
import { UserService } from '@user/user.service';
import { Timesheet } from './timesheet.model';
import { ERole } from '@shared/enum';

@ApiUseTags('Timesheets')
@Controller('api/rest/timesheets')
export class TimesheetController {
    constructor(
        private readonly timesheetService: TimesheetService,
        private readonly userService: UserService,
    ) {}

    @Get()
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    async getAll(@CurrentUser() id: any) {
        const timesheets = await this.timesheetService.getAll<Timesheet>();
        const userDoc = await this.userService.getOne(id);
        const user = await userDoc.get();
        const { role } = user.data();

        if (role === ERole.ADMIN) {
            return timesheets;
        }

        let authorizedTimesheets = [];

        for (const timesheet of timesheets) {
            if (timesheet.user.id === id) {
                authorizedTimesheets.push(timesheet);
            }
        }

        return authorizedTimesheets;
    }

    @Post()
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    async create(@CurrentUser() id: string, @Body() data: TimesheetDto) {
        const userDoc = await this.userService.getOne(id);
        const user = await userDoc.get();
        const { email, name } = user.data();
        const timesheet = await this.timesheetService.create({
            ...data,
            user: {
                id: user.id,
                email: email,
                name: name ? name : '',
            },
        });
        const save = await timesheet.save();
        const newTimesheet = await save.get();
        return {
            success: true,
            message: 'Successfully created a timesheet.',
            timesheet: {
                ...newTimesheet.data(),
            },
        };
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() data: Partial<TimesheetDto>) {
        return await this.timesheetService.update(id, data);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return await this.timesheetService.delete(id);
    }
}
