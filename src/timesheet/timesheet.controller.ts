import { Controller, Param, Body, Put, Delete, Post, Get, UseGuards } from '@nestjs/common';
import { TimesheetService } from './timesheet.service';
import { TimesheetDto } from './dto/timesheet.dto';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '@user/decorators/user.decorator';
import { UserService } from '@user/user.service';

@ApiUseTags('Timesheets')
@Controller('api/rest/timesheets')
export class TimesheetController {
    constructor(
        private readonly timesheetService: TimesheetService,
        private readonly userService: UserService
    ) { }

    @Get()
    async getAll() {
        return await this.timesheetService.getAll();
    }

    @Post()
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    async create(@CurrentUser() user, @Body() data: TimesheetDto) {
        const timesheet = await this.timesheetService
            .create(
                {
                    ...data,
                    user: {
                        id: user.id,
                        email: user.email,
                        name: user.name ? user.name : ''
                    }
                });
        const save = await timesheet.save();
        const newTimesheet = await save.get();
        return newTimesheet.data();
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
