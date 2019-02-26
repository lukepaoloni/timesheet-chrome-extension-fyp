import { Module, Global } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '@user/user.module';
import { HttpStrategy } from './strategy/http.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import Config from '@app/config';

@Global()
@Module({
  imports: [
    UserModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secretOrPrivateKey: Config.JWT_SECRET_KEY || 'secretKey',
      signOptions: {
        expiresIn: Config.SESSION_EXPIRES_IN,
      },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService, JwtStrategy]
})
export class AuthModule { }
