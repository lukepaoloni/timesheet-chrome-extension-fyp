import { Injectable, Logger } from '@nestjs/common';
import { User } from './user.model';
// import { UserDTO } from './dto/user.dto';
import { DatabaseService } from '@db/database.service';
import { AbstractService } from '../shared/service';
import { UserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import config from '@app/config';
import { UserRO } from './response/user.response';

@Injectable()
export class UserService extends AbstractService {
    constructor(db: DatabaseService) {
        super(db, 'users');
    }

    async getCollection() {
        const data = await super.getAll();
        let collection: UserRO[] = [];
        data.forEach(datum => {
            const user = new User(datum);
            collection.push(user.getData());
        });
        return collection;
    }

    async create(data: UserDto) {
        data.password = await bcrypt.hash(data.password, config.SALT_ROUNDS);
        this.data = data;
        this.data.createdAt = new Date()
        this.data.updatedAt = new Date()
        return this;
    }

    async update(id, data: Partial<UserDto>) {
        return await super.update(id, { ...data, updatedAt: new Date() });
    }
}
