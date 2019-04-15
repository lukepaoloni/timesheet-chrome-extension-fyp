import { ERole, EStatus } from '@shared/enum';

export interface UserRO {
    id: string;
    name: string;
    email: string;
    role: ERole;
    status: EStatus;
    token?: string;
    integrations?: any;
    settings?: any;
}
