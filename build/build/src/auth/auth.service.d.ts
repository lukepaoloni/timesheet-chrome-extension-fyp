import { UserService } from '../user/user.service';
import { UserRO } from '@user/response/user.response';
import { JwtService } from '@nestjs/jwt';
import { Credentials } from '../shared/credentials.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { User } from '@user/user.model';
import { auth } from 'firebase';
import { Provider } from './enum/provider.enum';
export declare class AuthService {
    readonly userService: UserService;
    private readonly jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    createToken(credentials: Credentials): Promise<{
        expiresIn: number;
        accessToken: string;
    }>;
    validateOAuthLogin(thirdPartyId: string, provider: Provider): Promise<string>;
    signPayload(payload: Partial<JwtPayload>): Promise<string>;
    validatePayload(payload: JwtPayload): Promise<User>;
    validateUser(payload: Partial<JwtPayload>): Promise<UserRO>;
    login(email: string, password: string): Promise<auth.UserCredential>;
}
