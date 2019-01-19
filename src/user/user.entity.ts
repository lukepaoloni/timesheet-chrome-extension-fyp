import { IRole, IStatus } from './interfaces';

export class User {

    id: string;

    name: string;

    email: string;

    password: string;

    role: IRole;

    status: IStatus;

    createdAt: Date;

    updatedAt: Date;

    lastLoggedIn: Date;
}
