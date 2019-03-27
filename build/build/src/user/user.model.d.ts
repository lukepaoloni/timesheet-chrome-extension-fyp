import { ERole, EStatus } from '@shared/enum';
import { UserRO } from './response/user.response';
import { AbstractModel } from '../shared/model';
export interface Integrations {
    google: {
        id: string;
        token: string;
    };
    github: {
        id: string;
        token: string;
    };
    bitbucket: {
        id: string;
        token: string;
    };
}
export declare class User extends AbstractModel<User> {
    constructor(partial?: Partial<User>);
    id: string;
    name: string;
    email: string;
    password: string;
    role: ERole;
    authType?: 'CUSTOM' | 'GOOGLE';
    integrations: Integrations;
    status: EStatus;
    createdAt: Date;
    updatedAt: Date;
    lastLoggedIn: Date;
    hashPassword(): Promise<void>;
    comparePassword(attempt: string): Promise<boolean>;
    getData(): UserRO;
}
