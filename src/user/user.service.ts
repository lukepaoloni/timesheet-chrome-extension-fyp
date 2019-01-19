import { Injectable, Logger } from '@nestjs/common';
import { User } from './user.entity';
// import { UserDTO } from './dto/user.dto';
import { DatabaseService } from '@db/database.service';
import { AbstractService } from '../base/service';

@Injectable()
export class UserService extends AbstractService {
    constructor(db: DatabaseService) {
        super(db, 'users');
    }

    create(data: User) {
        this.data = data;
        return this;
    }

    async update(id, data: Partial<User>) {
        return await super.update(id, data);
    }
}
