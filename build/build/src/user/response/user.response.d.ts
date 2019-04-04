import { ERole, EStatus } from '@shared/enum';
export interface UserRO {
    name: string;
    email: string;
    role: ERole;
    status: EStatus;
    token?: string;
}
