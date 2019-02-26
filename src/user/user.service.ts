import { Injectable, UnauthorizedException, Inject, forwardRef, NotAcceptableException } from '@nestjs/common';
import { User } from './user.model';
import { DatabaseService } from '@db/database.service';
import { AbstractService } from '../shared/service';
import { UserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { UserRO } from './response/user.response';
import { AuthDto } from '../auth/dto/auth.dto';
import { Credentials } from '../shared/credentials.dto';
import Config from '@app/config';
import { AuthService } from '../auth/auth.service';
import { JwtPayload } from '../auth/interfaces/jwt-payload.interface';
import { auth } from 'firebase';
import { LoginRO } from './response/login.response';
import config from '@app/config';

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

    async login(credentials: Credentials): Promise<LoginRO | auth.UserCredential> {
        const user = await this.getOneByEmail(credentials.email);
        if (!user) {
            throw new UnauthorizedException('User was not found');
        }
        if (user.authType === 'CUSTOM') {
            const isValid = await bcrypt.compare(credentials.password, user.password);
            if (!isValid) {
                throw new NotAcceptableException('Password is incorrect. Please try again.')
            }
            const payload: JwtPayload = {
                id: user.id,
                email: user.email
            }
            this.collection.doc(user.id).update({ lastLoggedIn: new Date() });
            const token = await this.authService.signPayload(payload);
            const date = new Date()
            date.setSeconds(
                date.getSeconds() + config.SESSION_EXPIRES_IN
            )
            return { token, email: user.email, expires: date } as any;
        }

        if (user.authType === 'GOOGLE') {
            return await this.authService.login(credentials.email, credentials.password);
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
        return new User({ ...users.docs[0].data(), id: users.docs[0].id });
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
        data.password = await bcrypt.hash(data.password, Config.SALT_ROUNDS);
        super.create(data);
        return this;
    }

    async update<UserDto>(id, data: Partial<UserDto>) {
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
