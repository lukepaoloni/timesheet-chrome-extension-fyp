import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { UserModule } from '@user/user.module';
import { ProjectModule } from '../project/project.module';
import { ClientModule } from '../client/client.module';

export const swagger = (app) => {
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

    const projectOptions = new DocumentBuilder()
        .setTitle('Projects')
        .setDescription('Projects API.')
        .setVersion('1.0')
        .addTag('Projects')
        .build();
    const projectDocument = SwaggerModule.createDocument(app, projectOptions, { include: [ProjectModule] });
    SwaggerModule.setup('api/swagger/projects', app, projectDocument);

    const clientOptions = new DocumentBuilder()
        .setTitle('Clients')
        .setDescription('Clients API')
        .setVersion('1.0')
        .addTag('Clients')
        .build();
    const clientDocument = SwaggerModule.createDocument(app, clientOptions, { include: [ClientModule] })
    SwaggerModule.setup('api/swagger/clients', app, clientDocument);

    const timesheetOptions = new DocumentBuilder()
        .setTitle('Timesheets')
        .setDescription('Timesheets API')
        .setVersion('1.0')
        .addTag('Timesheets')
        .build();
    const timesheetDocument = SwaggerModule.createDocument(app, timesheetOptions, { include: [ClientModule] })
    SwaggerModule.setup('api/swagger/timesheets', app, timesheetDocument);

}