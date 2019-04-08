import {
    Injectable,
    UnauthorizedException,
    Inject,
    forwardRef,
    NotAcceptableException,
    NotFoundException,
} from '@nestjs/common';
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
import { auth, database, firestore } from 'firebase';
import { LoginRO } from './response/login.response';
import config from '@app/config';
import { Provider } from '@auth/enum/provider.enum';

@Injectable()
export class UserService extends AbstractService {
    constructor(
        db: DatabaseService,
        @Inject(forwardRef(() => AuthService))
        readonly authService: AuthService,
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

    async getOneByProvider(provider: Provider, thirdPartyId: string) {
        const result = await this.db.firestore
            .collection('users')
            .where(`integrations.${provider}.id`, '==', thirdPartyId)
            .limit(1);
        const users = await result.get();
        if (users.docs[0]) return new User({ ...users.docs[0].data(), id: users.docs[0].id });
        return null;
    }

    async login(credentials: Credentials) {
        const emailExists = await this.getOneByEmail(credentials.email);

        if (!emailExists) {
            throw new UnauthorizedException('User was not found');
        }
        try {
            const { user } = await auth().signInWithEmailAndPassword(
                credentials.email,
                credentials.password,
            );
            const payload: Partial<JwtPayload> = {
                id: user.uid,
                email: user.email,
            };

            this.collection.doc(user.uid).update({ lastLoggedIn: new Date() });

            const token = await this.authService.signPayload(payload);
            const date = new Date();

            date.setSeconds(date.getSeconds() + config.SESSION_EXPIRES_IN);

            return { token, email: user.email, expires: date };
        } catch (err) {
            throw new NotAcceptableException('Email or Password is incorrect. Please try again.');
        }
        return null;
    }

    async register(credentials: Credentials) {
        const authUser = await auth().createUserWithEmailAndPassword(
            credentials.email,
            credentials.password,
        );

        await firestore()
            .collection('users')
            .doc(authUser.user.uid)
            .set({
                email: credentials.email,
                settings: {
                    dateTimeFormat: 'hh:mm',
                    enableNotifications: false,
                    weeklySubmissions: false,
                    weeklyUpdates: false,
                },
                createdAt: new Date(),
                updatedAt: new Date(),
            });

        return this.login(credentials);
    }

    async getOneByEmail(email: string) {
        const result = await this.db.firestore
            .collection('users')
            .where('email', '==', email)
            .limit(1);
        const users = await result.get();
        if (users.docs[0]) return new User({ ...users.docs[0].data(), id: users.docs[0].id });
        return null;
    }

    async userValid(email: string, password: string) {
        const result = await this.db.firestore
            .collection('users')
            .where('email', '==', email)
            .limit(1);
        const users = await result.get();
        return await bcrypt.compare(password, users.docs[0].data().password);
    }

    async create(data: Partial<UserDto | AuthDto>) {
        if (data.password) data.password = await bcrypt.hash(data.password, Config.SALT_ROUNDS);
        super.create(data);
        return this;
    }

    async update<UserDto>(id, data: Partial<UserDto>) {
        return await super.update(id, data);
    }

    async getOneByToken(token): Promise<User | undefined> {
        const results = await this.db.firestore
            .collection('users')
            .where('token', '==', token)
            .limit(1);
        const users = await results.get();
        if (users.docs[0].data()) return new User(users.docs[0].data());
        return undefined;
    }
}
