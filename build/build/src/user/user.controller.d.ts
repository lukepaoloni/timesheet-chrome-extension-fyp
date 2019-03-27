import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { Credentials } from '@shared/credentials.dto';
import { UserRO } from './response/user.response';
import { LoginRO } from './response/login.response';
import { auth } from 'firebase';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    login(credentials: Credentials): Promise<LoginRO | auth.UserCredential>;
    register(credentials: Credentials): Promise<LoginRO | auth.UserCredential>;
    getAll(): Promise<UserRO[]>;
    create(data: UserDto): Promise<import("firebase").firestore.DocumentData>;
    me(data: UserRO): Promise<UserRO>;
    getOne(id: string): Promise<UserRO>;
    update(id: string, data: Partial<UserDto>): Promise<{
        success: boolean;
        message?: undefined;
    } | {
        success: boolean;
        message: string;
    }>;
    destroy(id: string): Promise<{
        success: boolean;
        message?: undefined;
    } | {
        success: boolean;
        message: string;
    }>;
}
