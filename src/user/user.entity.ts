import { IRoles, IStatus } from './interfaces';

export class User {

    id: string;

    name: string;

    email: string;

    password: string;

    role: IRoles;

    status: IStatus;

    createdAt: Date;

    updatedAt: Date;

    lastLoggedIn: Date;
}
