import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { UserDto } from './dto/user.dto';

@Controller('api/V1/user')
export class UserController {
    constructor(private userService: UserService) { }

    @Get()
    async getAll() {
        return await this.userService.getCollection();
    }

    @Post()
    async create(@Body() data: UserDto) {
        const user = await this.userService.create(data);
        console.log(user);
        const save = await user.save();
        const getSave = await save.get();
        return getSave.data();
    }

    @Get(':id')
    async getOne(@Param('id') id: string) {
        const awaitUser = await this.userService.getOne(id);
        const user = await awaitUser.get();
        return user.data();
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() data: Partial<User>) {
        return await this.userService.update(id, data);
    }

    @Delete(':id')
    async destroy(@Param('id') id: string) {
        return await this.userService.delete(id);
    }
}
