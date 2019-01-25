import { NestFactory } from '@nestjs/core';
import { AppModule } from '@app/app.module';
import { Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import Config from '@app/config';
import { UserModule } from '@user/user.module';
import * as compression from 'compression';
import * as helmet from 'helmet';
import * as csurf from 'csurf';
import * as rateLimit from 'express-rate-limit';

declare const module: any;

const swagger = (app) => {
    const options = new DocumentBuilder()
        .setTitle('Timesheet')
        .setDescription('The API for the timesheets chrome extension.')
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api/swagger', app, document);

    const userOptions = new DocumentBuilder()
        .setTitle('Users')
        .setDescription('Users API.')
        .setVersion('1.0')
        .addTag('Users')
        .addBearerAuth()
        .build();
    const userDocument = SwaggerModule.createDocument(app, userOptions, { include: [UserModule] });
    SwaggerModule.setup('api/swagger/users', app, userDocument);
}

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    swagger(app);
    app.use(compression());
    app.use(helmet());
    app.enableCors();
    // app.use(csurf()); // Enables CSRF. But it needs to be configured correctly.
    app.use(rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100 // limit each IP to 100 requests per windowMs
    }));

    await app.listen(Config.APP_PORT);
    Logger.log(`Server running on http://localhost:${Config.APP_PORT}`, 'Bootstrap');
    if (module.hot) {
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }
}
bootstrap();
