import { Injectable, Logger, UnauthorizedException, HttpException, HttpStatus, Inject, forwardRef } from '@nestjs/common';
import { User } from './user.model';
// import { UserDTO } from './dto/user.dto';
import { DatabaseService } from '@db/database.service';
import { AbstractService } from '../shared/service';
import { UserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import config from '@app/config';
import { UserRO } from './response/user.response';
import { AuthDto } from '../auth/dto/auth.dto';
import { Credentials } from '../shared/credentials.dto';
import Config from '@app/config';
import { AuthService } from '../auth/auth.service';
import { JwtPayload } from '../auth/interfaces/jwt-payload.interface';
import { auth } from 'firebase';
import { LoginRO } from './response/login.response';

@Injectable()
export class UserService extends AbstractService {
    constructor(
        db: DatabaseService,
        @Inject(forwardRef(() => AuthService))
        readonly authService: AuthService
    ) {
        super(db, 'users');
    }

    async getCollection() {
        const data = await super.getAll();
        let collection: UserRO[] = [];
        data.forEach(datum => {
            collection.push(new User(datum).getData());
        });
        return collection;
    }

    async login(credentials: Credentials): Promise<LoginRO> {
        if (Config.USE_CUSTOM_AUTHENTICATION) {
            const user = await this.getOneByEmailPassword(credentials.email, credentials.password);
            if (!user) {
                throw new UnauthorizedException('User not found or email/password was incorrect');
            }
            const payload: JwtPayload = {
                email: user.email
            }
            this.collection.doc(user.id).update({ lastLoggedIn: new Date() });
            const token = await this.authService.signPayload(payload);
            return { token, email: user.email };
        }
        if (Config.USE_GOOGLE_AUTHENTICATION) {

        }
    }

    async register(credentials: Credentials): Promise<LoginRO | auth.UserCredential> {
        if (Config.USE_CUSTOM_AUTHENTICATION) {
            const user = await this.create({ ...credentials, authType: 'CUSTOM' });
            await user.save();
            return await this.login(credentials);
        }
        if (Config.USE_GOOGLE_AUTHENTICATION) {
            const user = await auth().createUserWithEmailAndPassword(credentials.email, credentials.password);
            await this.db.firestore.collection('users').doc(user.user.uid).set({
                email: user.user.email,
                authType: 'GOOGLE'
            });
            return user;
        }
    }

    async getOneByEmail(email: string) {
        const result = await this.db.firestore
            .collection('users')
            .where('email', '==', email)
            .limit(1);
        const users = await result.get();
        return new User(users.docs[0].data());
    }

    async getOneByEmailPassword(email: string, password: string): Promise<User> {
        const result = await this.db.firestore
            .collection('users')
            .where('email', '==', email)
            .limit(1);
        const users = await result.get();
        const user = new User({ ...users.docs[0].data(), id: users.docs[0].id });
        if (!user) {
            // Email doesn't exist.
            throw new HttpException('Invalid credentials. User does not exist with those credentials.', HttpStatus.BAD_REQUEST);
        }
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            // Password was not correct.
            throw new HttpException('Password was incorrect.', HttpStatus.BAD_REQUEST)
        }
        return user;
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
        super.create(data);
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
