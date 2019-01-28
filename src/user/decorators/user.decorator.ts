import { createParamDecorator } from '@nestjs/common';
import Config from '@app/config';
import { auth } from 'firebase';

export const CurrentUser = createParamDecorator((data, req) => {
    if (Config.USE_CUSTOM_AUTHENTICATION)
        return data ? req.user[data] : req.user;
    if (Config.USE_GOOGLE_AUTHENTICATION)
        return data ? auth().currentUser.toJSON()[data] : auth().currentUser.toJSON();
});