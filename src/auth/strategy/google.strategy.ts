import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import {
    OAuth2Strategy,
} from 'passport-google-oauth'
import { AuthService } from '../auth.service';
import config from '@app/config';
import { Provider } from '../enum/provider.enum';


@Injectable()
export class GoogleStrategy extends PassportStrategy(OAuth2Strategy, 'google') {
    constructor(private authService: AuthService) {
        super({
            clientID: config.GOOGLE_CLIENT_ID,
            clientSecret: config.GOOGLE_CLIENT_SECRET,
            callbackURL: config.GOOGLE_REDIRECT_URI,
            passReqToCallback: true,
            scope: ['profile', 'email']
        }, async (request, accessToken, refreshToken, profile, done) => {
            const email = profile.emails[0].value
            const jwt: string = await this.authService.validateOAuthLogin(profile.id, Provider.GOOGLE);
            const userExists = await this.authService.validateUser({ email }) as any
            const io = request.app.get('io')

            if (!userExists) {
                const userData = await this.authService.userService.create(
                    {
                        name: profile.displayName,
                        email,
                        integrations: {
                            google: {
                                id: profile.id,
                                token: accessToken
                            }
                        }
                    })
                await userData.save()
            }
            const user = {
                email,
                name: profile.displayName,
                integrations: {
                    google: {
                        id: profile.id,
                        token: accessToken
                    }
                },
                jwt
            }
            console.log('query', request.query)
            console.log('socketId', request.session.socketId)
            console.log('io.in', io.in)
            io.in(request.session.socketId).emit(Provider.GOOGLE, user)
            done(null, user)
        });
    }
}