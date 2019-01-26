import { Controller, Param, Body, Put, Delete, Post, Get } from '@nestjs/common';
import { TimesheetService } from './timesheet.service';
import { TimesheetDto } from './dto/timesheet.dto';
import { ApiUseTags } from '@nestjs/swagger';

@ApiUseTags('Timesheets')
@Controller('api/rest/timesheets')
export class TimesheetController {
    constructor(private timesheetService: TimesheetService) { }

    @Get()
    async getAll() {
        return await this.timesheetService.getAll();
    }

    @Post()
    async create(@Body() data: TimesheetDto) {
        const timesheet = await this.timesheetService.create(data);
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
