import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.model';
import { UserDto } from './dto/user.dto';
import { ApiUseTags, ApiResponse, ApiCreatedResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AuthDto } from 'src/auth/dto/auth.dto';
import { AuthService } from '../auth/auth.service';
import Config from '@app/config';
@ApiUseTags('Users')
@ApiBearerAuth()
@Controller('api/rest/users')
export class UserController {
    constructor(private userService: UserService, private authService: AuthService) { }

    @Post('login')
    async login(@Body() data: AuthDto) {
        if (Config.USE_CUSTOM_AUTHENTICATION) {
            const isValid = await this.userService.userValid(data.email, data.password);
            if (isValid) {
                return await this.authService.createToken(data);
            }
            return { success: false, message: 'User credentials are not valid.' }
        }
        if (Config.USE_GOOGLE_AUTHENTICATION) {
            // Do google login authentication
        }
    }

    @Post('register')
    async register(@Body() data: AuthDto) {
        if (Config.USE_CUSTOM_AUTHENTICATION) {
            const user = await this.userService.create(data);
            const save = await user.save();
            const newUser = await save.get();
            return newUser.data();
        }
        if (Config.USE_GOOGLE_AUTHENTICATION) {
            // Do google authentication register.
        }
    }

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
    @UseGuards(AuthGuard('bearer'))
    async getOne(@Param('id') id: string) {
        const awaitUser = await this.userService.getOne(id);
        const user = await awaitUser.get();
        console.log(user.data());
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
