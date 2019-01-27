import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '@user/user.module';
import { HttpStrategy } from './strategy/http.strategy';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import Config from '@app/config';

@Module({
  imports: [
    UserModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secretOrPrivateKey: Config.JWT_SECRET_KEY,
      signOptions: {
        expiresIn: Config.SESSION_EXPIRES_IN,
      },
    }),
  ],
  providers: [AuthService, HttpStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule { }
