import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-bitbucket-oauth2';
import { AuthService } from '../auth.service';
import config from '@app/config';
import { Provider } from '../enum/provider.enum';
import axios from 'axios';
import { AppGateway } from '@app/app.gateway';

@Injectable()
export class BitbucketStrategy extends PassportStrategy(Strategy, 'bitbucket') {
    constructor(private authService: AuthService, private appGateway: AppGateway) {
        super(
            {
                clientID: config.BITBUCKET_CLIENT_ID,
                clientSecret: config.BITBUCKET_CLIENT_SECRET,
                callbackURL: config.BITBUCKET_CALLBACK_URL,
                passReqToCallback: true,
                scope: ['email', 'account', 'repository', 'issue', 'team'],
            },
            async (request, accessToken, refreshToken, profile, done) => {
                let email = undefined;
                if (profile.emails) {
                    email = profile.emails[0].value;
                } else {
                    const response = await axios.get(`https://api.bitbucket.org/2.0/user/emails`, {
                        params: {
                            access_token: accessToken,
                        },
                    });
                    email = response.data.values[0].email;
                }
                const jwt: string = await this.authService.validateOAuthLogin(
                    profile.id,
                    Provider.BITBUCKET,
                );
                const userExists = (await this.authService.validateUser({ email })) as any;

                if (!userExists) {
                    const userData = await this.authService.userService.create({
                        name: profile.displayName,
                        email,
                        integrations: {
                            bitbucket: {
                                id: profile.id,
                                token: accessToken,
                            },
                        },
                    });
                    await userData.save();
                }
                const user = {
                    email,
                    name: profile.displayName,
                    integrations: {
                        bitbucket: {
                            id: profile.id,
                            token: accessToken,
                        },
                    },
                    jwt,
                };
                this.appGateway.wss.emit(Provider.BITBUCKET, user);
                done(null, user);
            },
        );
    }
}
