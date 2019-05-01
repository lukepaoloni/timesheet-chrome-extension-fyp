import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { Logger } from '@nestjs/common';
import Config from './app/config';
import * as compression from 'compression';
import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';
import { swagger } from './shared/swagger';
import * as expressSession from 'express-session';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    swagger(app);
    app.use(compression());
    app.use(helmet());
    app.use(
        rateLimit({
            windowMs: 15 * 60 * 1000, // 15 minutes
            max: 250, // limit each IP to 250 requests per windowMs
        }),
    );
    app.use(
        expressSession({
            secret: Config.JWT_SECRET_KEY,
            resave: true,
            saveUninitialized: true,
            cookie: {
                maxAge: Config.SESSION_EXPIRES_IN,
            },
        }),
    );

    await app.listen(Config.APP_PORT);
    Logger.log(`Server running on ${Config.APP_DOMAIN}`, 'Bootstrap');
}
bootstrap();
