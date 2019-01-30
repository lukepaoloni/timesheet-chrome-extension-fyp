import { createParamDecorator } from '@nestjs/common';
import Config from '@app/config';
import { auth } from 'firebase';

export const CurrentUser = createParamDecorator((data, req) => {
    return data ? req.user[data] : req.user;
});