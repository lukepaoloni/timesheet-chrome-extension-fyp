import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
    UseGuards,
    Req,
    ForbiddenException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.model';
import { UserDto } from './dto/user.dto';
import { ApiUseTags, ApiResponse, ApiCreatedResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Credentials } from '@shared/credentials.dto';
import { CurrentUser } from './decorators/user.decorator';
import { UserRO } from './response/user.response';
import { LoginRO } from './response/login.response';
import { auth } from 'firebase';
import * as webPush from 'web-push';
import config from '@app/config';

@ApiUseTags('Users')
@Controller('api/rest/users')
export class UserController {
    constructor(private userService: UserService) {
        webPush.setVapidDetails(
            'mailto:lukepaoloni.me@gmail.com',
            config.PUSH_NOTIFICATION_PUBLIC_KEY,
            config.PUSH_NOTIFICATION_PRIVATE_KEY,
        );
    }

    @Post('login')
    @ApiResponse({ status: 200, description: `You've successfully logged in.` })
    async login(@Body() credentials: Credentials): Promise<LoginRO | auth.UserCredential> {
        return await this.userService.login(credentials);
    }

    @Post('register')
    @ApiCreatedResponse({
        description: 'The record has been successfully created.',
    })
    async register(@Body() credentials: Credentials) {
        try {
            return await this.userService.register(credentials);
        } catch (err) {
            throw new ForbiddenException(err.message);
        }
    }

    @Get()
    @ApiResponse({
        status: 200,
        description: 'Successfully collected all user documents.',
    })
    async getAll() {
        return await this.userService.getCollection();
    }

    @Post()
    @ApiCreatedResponse({
        description: 'The record has been successfully created.',
    })
    async create(@Body() data: UserDto) {
        const user = await this.userService.create(data);
        const save = await user.save();
        const newUser = await save.get();
        return newUser.data();
    }

    @Get('me')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    async me(@CurrentUser() data: UserRO) {
        const user = await this.userService.getOne(data);
        const userData = await user.get();
        return new User({ ...userData.data(), id: userData.id }).getData();
    }

    @Put('me/email')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    async changeEmail(@CurrentUser() user: any, @Body() body: any) {
        body.email = body.email.trim();
        return await this.userService.update(user, body);
    }

    @Get(':id')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    async getOne(@Param('id') id: string) {
        const awaitUser = await this.userService.getOne(id);
        const user = await awaitUser.get();
        return new User(user.data()).getData();
    }

    @Put('me')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    async updateMe(@CurrentUser() user: any, @Body() body: UserDto) {
        if (body.email) {
            body.email = body.email.trim();
            const emailExists = await this.userService.getOneByEmail(body.email);
            if (emailExists) {
                throw new ForbiddenException(
                    `That email currently exists. Please try a different email.`,
                );
            }
        }
        return await this.userService.update(user, body);
    }

    @Put(':id')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    async update(@Param('id') id: string, @Body() data: Partial<UserDto>) {
        const newData = await this.userService.update(id, data);
        return new User(newData).getData();
    }

    @Delete(':id')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    async destroy(@Param('id') id: string) {
        return await this.userService.delete(id);
    }

    @Post('me/integrations/github/import')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    async importIntegration(@CurrentUser() data: any) {
        const user = await this.userService.getOne(data);
        const existingData = await user.get();
        user.update({
            integrations: {
                github: {
                    ...existingData.data().integrations.github,
                    lastMigratedDate: new Date(),
                },
            },
        });
        return {
            success: true,
            message: 'Successfully updated the record.',
        };
    }

    @Post('subscribe')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    async subscribe(@CurrentUser() id: any, @Body() body: any) {
        console.log('id', id);
        this.userService.update(id, { fcmPayload: body });
        try {
            return {
                success: true,
                message: 'Successfully subscribed.',
            };
        } catch (err) {
            console.error(err);
        }
    }

    @Post('send')
    async sendNotifications(@Body() body: any) {
        const payload = JSON.stringify(body);
        const users = await this.userService.getAllForPushNotifications();
        for (const user of users) {
            try {
                await webPush.sendNotification(JSON.parse(user.fcmPayload), payload);
            } catch (err) {
                console.error(err);
            }
        }

        return {
            success: true,
            message: 'Successfully sent notifications.',
        };
    }
}
