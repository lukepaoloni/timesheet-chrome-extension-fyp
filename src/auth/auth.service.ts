import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UserRO } from '@user/response/user.response';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { User } from '@user/user.model';
import { AuthDto } from './dto/auth.dto';
import Config from '@app/config';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService, private readonly jwtService: JwtService) { }

    async createToken(data: AuthDto) {
        const isValid = await this.userService.userValid(data.email, data.password);
        if (isValid) {
            const user: JwtPayload = { email: data.email }
            const accessToken = this.jwtService.sign(user);
            return {
                expiresIn: Config.SESSION_EXPIRES_IN,
                accessToken,
            };
        }
        return new UnauthorizedException();
    }

    async validateUser(token: string | JwtPayload): Promise<UserRO> {
        let user: User = undefined;
        if (typeof token === 'string')
            user = await this.userService.getOneByToken(token);
        if (typeof token === 'object')
            user = await this.userService.getOneByEmail(token.email);

        return user.getData();
    }
}
