import { Strategy } from 'passport-github';
import { AuthService } from '../auth.service';
import { AppGateway } from '@app/app.gateway';
declare const GithubStrategy_base: new (...args: any[]) => typeof Strategy;
export declare class GithubStrategy extends GithubStrategy_base {
    private authService;
    private appGateway;
    constructor(authService: AuthService, appGateway: AppGateway);
    validate(accessToken: any, refreshToken: any, profile: any, done: any): Promise<any>;
}
export {};
