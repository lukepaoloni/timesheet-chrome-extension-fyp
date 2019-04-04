import { User } from './user.model';
import { DatabaseService } from '@db/database.service';
import { AbstractService } from '../shared/service';
import { UserDto } from './dto/user.dto';
import { UserRO } from './response/user.response';
import { AuthDto } from '../auth/dto/auth.dto';
import { Credentials } from '../shared/credentials.dto';
import { AuthService } from '../auth/auth.service';
import { auth } from 'firebase';
import { LoginRO } from './response/login.response';
import { Provider } from '@auth/enum/provider.enum';
export declare class UserService extends AbstractService {
    readonly authService: AuthService;
    constructor(db: DatabaseService, authService: AuthService);
    getCollection(): Promise<UserRO[]>;
    getOneByProvider(provider: Provider, thirdPartyId: string): Promise<User>;
    login(credentials: Credentials): Promise<LoginRO | auth.UserCredential>;
    register(credentials: Credentials): Promise<LoginRO | auth.UserCredential>;
    getOneByEmail(email: string): Promise<User>;
    userValid(email: string, password: string): Promise<boolean>;
    create(data: Partial<UserDto | AuthDto>): Promise<this>;
    update<UserDto>(id: any, data: Partial<UserDto>): Promise<{
        success: boolean;
        message?: undefined;
    } | {
        success: boolean;
        message: string;
    }>;
    getOneByToken(token: any): Promise<User | undefined>;
}
