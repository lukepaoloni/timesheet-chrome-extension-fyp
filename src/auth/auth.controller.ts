import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@ApiUseTags('Authentication')
@Controller('api/rest/auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) { }

    @Get('google')
    @UseGuards(AuthGuard('google'))
    googleLogin() {
        console.log('Hit login')
    }

    @Get('google/callback')
    @UseGuards(AuthGuard('google'))
    googleLoginCallback(@Req() req) {
        console.log('req.user', req.user)
        return req.user
    }

    @Get('github')
    @UseGuards(AuthGuard('github'))
    githubLogin() {
        console.log('Hit login')
    }

    @Get('github/callback')
    @UseGuards(AuthGuard('github'))
    githubLoginCallback(@Req() req) {
        console.log('req.user', req.user)
        return req.user
    }

    @Get('bitbucket')
    @UseGuards(AuthGuard('bitbucket'))
    bitbucketLogin() {
        console.log('Hit login')
    }

    @Get('bitbucket/callback')
    @UseGuards(AuthGuard('bitbucket'))
    bitbucketLoginCallback(@Req() req) {
        return req.user
    }
}
