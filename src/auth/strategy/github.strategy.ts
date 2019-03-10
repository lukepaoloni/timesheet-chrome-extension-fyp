import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-github'
import { AuthService } from '../auth.service';
import Config from '@app/config';
import { Provider } from '@auth/enum/provider.enum';
import { AppGateway } from '@app/app.gateway';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
    constructor(private authService: AuthService, private appGateway: AppGateway) {
        super({
            clientID: Config.GITHUB_CLIENT_ID,
            clientSecret: Config.GITHUB_CLIENT_SECRET,
            callbackURL: Config.GITHUB_CALLBACK_URL,
            passReqToCallback: true,
            scope: ['profile', 'user:email'],
        }, async (request, accessToken, refreshToken, profile, done) => {
            const email = profile.emails[0].value
            const jwt: string = await this.authService.validateOAuthLogin(profile.id, Provider.GITHUB);
            const userExists = await this.authService.validateUser({ email }) as any

            if (!userExists) {
                const userData = await this.authService.userService.create(
                    {
                        name: profile.displayName,
                        email,
                        integrations: {
                            github: {
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
                    github: {
                        id: profile.id,
                        token: accessToken
                    }
                },
                jwt
            }
            this.appGateway.wss.emit(Provider.GITHUB, user)
            done(null, user)
        })
    }

    async validate(accessToken, refreshToken, profile, done) {
        try {
            const email = profile.emails[0].value
            const jwt: string = await this.authService.validateOAuthLogin(profile.id, Provider.GITHUB);
            let user = await this.authService.validateUser({ email }) as any
            if (!user) {
                const userData = await this.authService.userService.create(
                    {
                        name: profile.displayName,
                        email,
                        integrations: {
                            github: {
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