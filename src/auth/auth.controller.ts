import { Controller, Get, Req, UseGuards, Param, Query } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { AppGateway } from '@app/app.gateway';
import { CurrentUser } from '../user/decorators/user.decorator';

@ApiUseTags('Authentication')
@Controller('api/rest/auth')
export class AuthController {
    constructor(private readonly authService: AuthService, private appGateway: AppGateway) {}

    @Get('google')
    @UseGuards(AuthGuard('google'))
    googleLogin() {}

    @Get('google/callback')
    @UseGuards(AuthGuard('google'))
    googleLoginCallback(@Req() req) {
        return req.user;
    }

    @Get('github')
    @UseGuards(AuthGuard('github'))
    githubLogin() {}

    @Get('github/callback')
    @UseGuards(AuthGuard('github'))
    async githubLoginCallback(@Req() req) {
        const data = req.user;
        const { integrate } = req.params;
        console.log('params', req.params);
        if (integrate) {
            console.log('Start the integration');
        } else {
            return await this.authService.createUser(data);
        }
    }

    @Get('bitbucket')
    @UseGuards(AuthGuard('bitbucket'))
    bitbucketLogin() {}

    @Get('bitbucket/callback')
    @UseGuards(AuthGuard('bitbucket'))
    bitbucketLoginCallback(@Req() req) {
        return req.user;
    }
}
