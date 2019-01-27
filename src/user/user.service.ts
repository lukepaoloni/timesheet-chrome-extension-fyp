import { Injectable, Logger } from '@nestjs/common';
import { User } from './user.model';
// import { UserDTO } from './dto/user.dto';
import { DatabaseService } from '@db/database.service';
import { AbstractService } from '../shared/service';
import { UserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import config from '@app/config';
import { UserRO } from './response/user.response';
import { AuthDto } from '../auth/dto/auth.dto';

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

    async getOneByEmail(email: string) {
        const result = await this.db.firestore
            .collection('users')
            .where('email', '==', email)
            .limit(1);
        const users = await result.get();
        return new User(users.docs[0].data());
    }

    async getOneByEmailPassword(email: string, password: string) {
        const result = await this.db.firestore
            .collection('users')
            .where('email', '==', email)
            .limit(1);
        const users = await result.get();
        const user = new User(users.docs[0].data());
        const isValid = await bcrypt.compare(password, user.password);
        if (isValid) {
            return user;
        }
        return false;
    }

    async userValid(email: string, password: string) {
        const result = await this.db.firestore
            .collection('users')
            .where('email', '==', email)
            .limit(1);
        const users = await result.get();
        return await bcrypt.compare(password, users.docs[0].data().password);
    }

    async create(data: UserDto | AuthDto) {
        data.password = await bcrypt.hash(data.password, config.SALT_ROUNDS);
        this.data = data;
        return this;
    }

    async update(id, data: Partial<UserDto>) {
        return await super.update(id, data);
    }

    async getOneByToken(token): Promise<User | undefined> {
        const results = await this.db.firestore.collection('users').where('token', '==', token).limit(1);
        const users = await results.get();
        if (users.docs[0].data())
            return new User(users.docs[0].data());
        return undefined;
    }
}
