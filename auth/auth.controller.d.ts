import { AuthService } from './auth.service';
import { AppGateway } from '../app/app.gateway';
export declare class AuthController {
    private readonly authService;
    private appGateway;
    constructor(authService: AuthService, appGateway: AppGateway);
    googleLogin(): void;
    googleLoginCallback(req: any): any;
    githubLogin(): void;
    githubLoginCallback(req: any): Promise<import("firebase").firestore.DocumentData>;
    bitbucketLogin(): void;
    bitbucketLoginCallback(req: any): any;
    verifyToken(token: string): {
        valid: boolean;
        message: string;
    };
}
