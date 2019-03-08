import { AppGateway } from '@app/app.gateway';
import { Module, Global } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '@user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { GoogleStrategy } from './strategy/google.strategy';
import { AuthController } from './auth.controller';
import Config from '@app/config';
import { GithubStrategy } from './strategy/github.strategy';
import { BitbucketStrategy } from './strategy/bitbucket.strategy';

@Global()
@Module({
  imports: [
    UserModule,
    PassportModule.register({ defaultStrategy: 'jwt', session: true }),
    JwtModule.register({
      secretOrPrivateKey: Config.JWT_SECRET_KEY || 'secretKey',
      signOptions: {
        expiresIn: Config.SESSION_EXPIRES_IN,
      },
    }),
  ],
  providers: [AuthService, JwtStrategy, GoogleStrategy, GithubStrategy, BitbucketStrategy, AppGateway],
  exports: [AuthService, JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule { }
