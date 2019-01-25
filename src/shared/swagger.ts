import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { UserModule } from '@user/user.module';
import { ProjectModule } from '../project/project.module';

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
}