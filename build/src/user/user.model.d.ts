import { ERole, EStatus } from '@shared/enum';
import { UserRO } from './response/user.response';
import { AbstractModel } from '../shared/model';
import { Settings } from './settings';
declare class IntegrationDto {
    id: string;
    token: string;
}
export declare class Integrations {
    google: IntegrationDto;
    github: IntegrationDto;
    bitbucket: IntegrationDto;
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
    fcmPayload?: any;
    settings?: Settings;
    status: EStatus;
    createdAt: Date;
    updatedAt: Date;
    lastLoggedIn: Date;
    hashPassword(): Promise<void>;
    comparePassword(attempt: string): Promise<boolean>;
    getData(): UserRO;
}
export {};
