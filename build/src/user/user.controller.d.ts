import { UserService } from './user.service';
import { User } from './user.model';
import { UserDto } from './dto/user.dto';
import { Credentials } from '@shared/credentials.dto';
import { UserRO } from './response/user.response';
import { LoginRO } from './response/login.response';
import { auth } from 'firebase';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    login(credentials: Credentials): Promise<LoginRO | auth.UserCredential>;
    register(credentials: Credentials): Promise<{
        token: string;
        email: string;
        expires: Date;
    }>;
    getAll(): Promise<User[]>;
    create(data: UserDto): Promise<import("firebase").firestore.DocumentData>;
    me(data: UserRO): Promise<UserRO>;
    changeEmail(user: any, body: any): Promise<import("firebase").firestore.DocumentData>;
    getOne(id: string): Promise<UserRO>;
    updateMe(user: any, body: UserDto): Promise<import("firebase").firestore.DocumentData>;
    update(id: string, data: Partial<UserDto>): Promise<UserRO>;
    destroy(id: string): Promise<{
        success: boolean;
        message?: undefined;
    } | {
        success: boolean;
        message: string;
    }>;
    deleteMe(id: string): Promise<{
        success: boolean;
        message?: undefined;
    } | {
        success: boolean;
        message: string;
    }>;
    importIntegration(data: any): Promise<{
        success: boolean;
        message: string;
    }>;
    subscribe(id: any, body: any): Promise<{
        success: boolean;
        message: string;
    }>;
    sendNotifications(body: any): Promise<{
        success: boolean;
        message: string;
    }>;
}
