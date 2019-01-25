import { IRole, IStatus } from '../interfaces';
export declare class UserDto {
    readonly email: string;
    readonly name: string;
    password: string;
    readonly role: IRole;
    readonly status: IStatus;
}
