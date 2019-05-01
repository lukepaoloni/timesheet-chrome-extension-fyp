import { OAuth2Strategy } from 'passport-google-oauth';
import { AuthService } from '../auth.service';
import { AppGateway } from '../../app/app.gateway';
declare const GoogleStrategy_base: new (...args: any[]) => typeof OAuth2Strategy;
export declare class GoogleStrategy extends GoogleStrategy_base {
    private authService;
    private appGateway;
    constructor(authService: AuthService, appGateway: AppGateway);
}
export {};
