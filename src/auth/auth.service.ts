import {
  Injectable,
  forwardRef,
  Inject,
  ForbiddenException,
} from '@nestjs/common';
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
import { Provider } from './enum/provider.enum';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(data: any) {
    const userExists = (await this.validateUser({
      email: data.email,
    })) as any;

    if (!userExists) {
      delete data.jwt;
      const userData = await this.userService.create(data);
      const user = await userData.save();
      const newUser = await user.get();
      return newUser.data();
    }
  }

  async createToken(credentials: Credentials) {
    const user = (await this.userService.login(credentials)) as LoginRO;
    const accessToken = this.jwtService.sign({ email: user.email });
    return {
      expiresIn: Config.SESSION_EXPIRES_IN,
      accessToken,
    };
  }

  async validateOAuthLogin(thirdPartyId: string, provider: Provider) {
    try {
      return sign(
        {
          thirdPartyId,
          provider,
        },
        Config.JWT_SECRET_KEY,
        {
          expiresIn: Config.SESSION_EXPIRES_IN,
        },
      );
    } catch (err) {
      throw new ForbiddenException('validateOAuthLogin', err.message);
    }
  }

  async signPayload(payload: Partial<JwtPayload>): Promise<string> {
    return sign(payload, Config.JWT_SECRET_KEY, {
      expiresIn: Config.SESSION_EXPIRES_IN,
    });
  }

  async validatePayload(payload: JwtPayload): Promise<User> {
    return await this.userService.getOneByEmail(payload.email);
  }

  async validateUser(payload: Partial<JwtPayload>) {
    if (payload.email) {
      return await this.userService.getOneByEmail(payload.email);
    }

    if (payload.thirdPartyId) {
      return await this.userService.getOneByProvider(
        payload.provider,
        payload.thirdPartyId,
      );
    }
  }

  async login(email: string, password: string) {
    return await auth().signInWithEmailAndPassword(email, password);
  }
}
