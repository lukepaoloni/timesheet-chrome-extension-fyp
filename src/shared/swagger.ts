import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { UserModule } from 'src/user/user.module';
import { ProjectModule } from '../project/project.module';
import { ClientModule } from '../client/client.module';
import config from '../app/config';

export const swagger = app => {
    const options = new DocumentBuilder()
        .setTitle('Timesheet')
        .setDescription('The API for the timesheets chrome extension.')
        .setVersion('1.0')
        .setBasePath(config.APP_DOMAIN)
        .addBearerAuth('Authorization', 'header')
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api/swagger', app, document);

    const userOptions = new DocumentBuilder()
        .setTitle('Users')
        .setDescription('Users API.')
        .setVersion('1.0')
        .addTag('Users')
        .addBearerAuth('Authorization', 'header')
        .build();
    const userDocument = SwaggerModule.createDocument(app, userOptions, { include: [UserModule] });
    SwaggerModule.setup('api/swagger/users', app, userDocument);

    const projectOptions = new DocumentBuilder()
        .setTitle('Projects')
        .setDescription('Projects API.')
        .setVersion('1.0')
        .addTag('Projects')
        .addBearerAuth('Authorization', 'header')
        .build();
    const projectDocument = SwaggerModule.createDocument(app, projectOptions, {
        include: [ProjectModule],
    });
    SwaggerModule.setup('api/swagger/projects', app, projectDocument);

    const clientOptions = new DocumentBuilder()
        .setTitle('Clients')
        .setDescription('Clients API')
        .setVersion('1.0')
        .addTag('Clients')
        .addBearerAuth('Authorization', 'header')
        .build();
    const clientDocument = SwaggerModule.createDocument(app, clientOptions, {
        include: [ClientModule],
    });
    SwaggerModule.setup('api/swagger/clients', app, clientDocument);

    const timesheetOptions = new DocumentBuilder()
        .setTitle('Timesheets')
        .setDescription('Timesheets API')
        .setVersion('1.0')
        .addTag('Timesheets')
        .addBearerAuth('Authorization', 'header')
        .build();
    const timesheetDocument = SwaggerModule.createDocument(app, timesheetOptions, {
        include: [ClientModule],
    });
    SwaggerModule.setup('api/swagger/timesheets', app, timesheetDocument);
};
