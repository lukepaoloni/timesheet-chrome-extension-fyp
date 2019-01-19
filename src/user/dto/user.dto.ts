import { IRole, IStatus } from '../interfaces';
export interface UserDto {
    email: string;
    name: string;
    password: string;
    role: IRole;
    status: IStatus;
}
