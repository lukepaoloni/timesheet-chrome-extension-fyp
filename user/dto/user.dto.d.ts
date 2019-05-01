import { ERole, EStatus } from '@shared/enum';
import { Integrations } from '../user.model';
import { Settings } from 'src/user/settings';
export declare class UserDto {
    email?: string;
    name?: string;
    password?: string;
    role?: ERole;
    status?: EStatus;
    integrations?: Integrations;
    settings?: Settings;
}
