import { User } from './user.model';
import { DatabaseService } from '@db/database.service';
import { AbstractService } from '../base/service';
import { UserDto } from './dto/user.dto';
import { UserRO } from './response/user.response';
export declare class UserService extends AbstractService {
    constructor(db: DatabaseService);
    getCollection(): Promise<UserRO[]>;
    create(data: UserDto): Promise<this>;
    update(id: any, data: Partial<User>): Promise<void>;
}
