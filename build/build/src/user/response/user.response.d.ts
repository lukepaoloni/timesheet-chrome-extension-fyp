import { IRole, IStatus } from '@user/interfaces';
export interface UserRO {
    name: string;
    email: string;
    role: IRole;
    status: IStatus;
}
