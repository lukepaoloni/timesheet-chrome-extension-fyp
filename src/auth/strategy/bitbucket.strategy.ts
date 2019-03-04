import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-bitbucket-oauth2'
import { AuthService } from '../auth.service';
import config from '@app/config';
import { Provider } from '../enum/provider.enum';
import axios from 'axios';

@Injectable()
export class BitbucketStrategy extends PassportStrategy(Strategy, 'bitbucket') {
    constructor(private authService: AuthService) {
        super({
            clientID: config.BITBUCKET_CLIENT_ID,
            clientSecret: config.BITBUCKET_CLIENT_SECRET,
            callbackURL: config.BITBUCKET_CALLBACK_URL,
            scope: ['email', 'account']
        });
    }

    async validate(accessToken, refreshToken, profile, done) {
        try {
            let email = undefined
            if (profile.emails) {
                email = profile.emails[0].value
            } else {
                const response = await axios.get(`https://api.bitbucket.org/2.0/user/emails`, {
                    params: {
                        access_token: accessToken
                    }
                })
                email = response.data.values[0].email
            }
            const jwt: string = await this.authService.validateOAuthLogin(profile.id, Provider.BITBUCKET);
            let user = await this.authService.validateUser({ email }) as any
            if (!user) {
                const userData = await this.authService.userService.create(
                    {
                        name: profile.displayName,
                        email,
                        integrations: {
                            bitbucket: {
                                id: profile.id,
                                token: accessToken
                            }
                        }
                    })
                const firebaseUser = await userData.save()
                const newUser = await firebaseUser.get()
                user = newUser.data()
            }
            const payload = {
                jwt,
                ...user,
            };
            return done(null, payload)
        } catch (err) {
            console.log(err)
        }
    }
}