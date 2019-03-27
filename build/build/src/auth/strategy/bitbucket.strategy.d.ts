import { AuthService } from '../auth.service';
import { AppGateway } from '@app/app.gateway';
declare const BitbucketStrategy_base: new (...args: any[]) => any;
export declare class BitbucketStrategy extends BitbucketStrategy_base {
    private authService;
    private appGateway;
    constructor(authService: AuthService, appGateway: AppGateway);
}
export {};
