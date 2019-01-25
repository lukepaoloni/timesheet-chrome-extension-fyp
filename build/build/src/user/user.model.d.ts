import { IRole, IStatus } from './interfaces';
import { UserRO } from './response/user.response';
export declare class User {
    constructor(partial: Partial<User>);
    id: string;
    name: string;
    email: string;
    password: string;
    role: IRole;
    status: IStatus;
    createdAt: Date;
    updatedAt: Date;
    lastLoggedIn: Date;
    hashPassword(): Promise<void>;
    comparePassword(attempt: string): Promise<boolean>;
    getData(showToken?: boolean): UserRO;
}
