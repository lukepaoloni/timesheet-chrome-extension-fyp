import { Injectable, Logger } from '@nestjs/common';
import { User } from './user.entity';
// import { UserDTO } from './dto/user.dto';
import { DatabaseService } from '@db/database.service';
import { AbstractService } from '../base/service';
import { UserDto } from './dto/user.dto';
import bcrypt from 'bcrypt';
import config from '@app/config';

@Injectable()
export class UserService extends AbstractService {
    constructor(db: DatabaseService) {
        super(db, 'users');
    }

    async create(data: UserDto) {
        data.password = await bcrypt.hash(data.password, config.SALT_ROUNDS);
        this.data = data;
        return this;
    }

    async update(id, data: Partial<User>) {
        return await super.update(id, data);
    }
}
