import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.model';
import { UserDto } from './dto/user.dto';
import { ApiUseTags, ApiResponse, ApiCreatedResponse, ApiBearerAuth } from '@nestjs/swagger';
@ApiUseTags('Users')
@ApiBearerAuth()
@Controller('api/rest/users')
export class UserController {
    constructor(private userService: UserService) { }

    @Get()
    @ApiResponse({ status: 200, description: 'Successfully collected all user documents.' })
    async getAll() {
        return await this.userService.getCollection();
    }

    @Post()
    @ApiCreatedResponse({ description: 'The record has been successfully created.' })
    async create(@Body() data: UserDto) {
        const user = await this.userService.create(data);
        const save = await user.save();
        const newUser = await save.get();
        return newUser.data();
    }

    @Get(':id')
    async getOne(@Param('id') id: string) {
        const awaitUser = await this.userService.getOne(id);
        const user = await awaitUser.get();
        return user.data();
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() data: Partial<UserDto>) {
        return await this.userService.update(id, data);
    }

    @Delete(':id')
    async destroy(@Param('id') id: string) {
        return await this.userService.delete(id);
    }
}
