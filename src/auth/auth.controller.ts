import { Controller, Get, Req, UseGuards, Param, Query } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { AppGateway } from '@app/app.gateway';
import * as jwt from 'jsonwebtoken';

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

    @Get('jwt/verify')
    verifyToken(@Query('token') token: string) {
        const { exp } = jwt.decode(token) as any;
        if (Date.now() / 1000 > exp) {
            return {
                valid: false,
                message: 'Token has expired.',
            };
        }
        return {
            valid: true,
            message: 'Token is valid.',
        };
    }
}
