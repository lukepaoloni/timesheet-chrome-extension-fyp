import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UserRO } from '@user/response/user.response';
import { JwtService } from '@nestjs/jwt';
import Config from '@app/config';
import { Credentials } from '../shared/credentials.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { sign } from 'jsonwebtoken';
import { User } from '@user/user.model';
import { auth } from 'firebase';
import { LoginRO } from '../user/response/login.response';

@Injectable()
export class AuthService {
    constructor(
        @Inject(forwardRef(() => UserService))
        readonly userService: UserService,
        private readonly jwtService: JwtService
    ) { }

    async createToken(credentials: Credentials) {
        const user = await this.userService.login(credentials) as LoginRO;
        const accessToken = this.jwtService.sign({ email: user.email });
        return {
            expiresIn: Config.SESSION_EXPIRES_IN,
            accessToken
        };
    }

    async signPayload(payload: JwtPayload): Promise<string> {
        return sign(payload, Config.JWT_SECRET_KEY, { expiresIn: Config.SESSION_EXPIRES_IN });
    }

    async validatePayload(payload: JwtPayload): Promise<User> {
        return await this.userService.getOneByEmail(payload.email);
    }

    async validateUser(token: any): Promise<UserRO> {
        let user: UserRO = undefined;
        if (typeof token === 'string')
            user = await this.userService.getOneByToken(token);
        if (typeof token === 'object')
            user = await this.userService.getOneByEmail(token.email);

        return user;
    }

    async login(email: string, password: string) {
        return await auth().signInWithEmailAndPassword(email, password);
    }
}
