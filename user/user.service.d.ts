import { User } from './user.model';
import { DatabaseService } from '../database/database.service';
import { AbstractService } from '../shared/service';
import { UserDto } from './dto/user.dto';
import { UserRO } from './response/user.response';
import { AuthDto } from '../auth/dto/auth.dto';
import { Credentials } from '../shared/credentials.dto';
import { AuthService } from '../auth/auth.service';
import { firestore } from 'firebase';
import { Provider } from '../auth/enum/provider.enum';
export declare class UserService extends AbstractService {
    readonly authService: AuthService;
    constructor(db: DatabaseService, authService: AuthService);
    getCollection(): Promise<UserRO[]>;
    getOneByProvider(provider: Provider, thirdPartyId: string): Promise<User>;
    login(credentials: Credentials): Promise<{
        token: string;
        email: string;
        expires: Date;
    }>;
    register(credentials: Credentials): Promise<{
        token: string;
        email: string;
        expires: Date;
    }>;
    getOneByEmail(email: string): Promise<User>;
    userValid(email: string, password: string): Promise<boolean>;
    create(data: Partial<UserDto | AuthDto>): Promise<this>;
    update<UserDto>(id: any, data: Partial<UserDto>): Promise<firestore.DocumentData>;
    getAllForPushNotifications(): Promise<User[]>;
    getOneByToken(token: any): Promise<User | undefined>;
}
