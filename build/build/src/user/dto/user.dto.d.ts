import { ERole, EStatus } from '@shared/enum';
import { Integrations } from '../user.model';
export declare class UserDto {
    email: string;
    name: string;
    password: string;
    role: ERole;
    status: EStatus;
    integrations: Integrations;
}
