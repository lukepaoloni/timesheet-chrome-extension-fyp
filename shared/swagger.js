'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const swagger_1 = require('@nestjs/swagger');
const user_module_1 = require('../user/user.module');
const project_module_1 = require('../project/project.module');
const client_module_1 = require('../client/client.module');
const config_1 = require('../app/config');
exports.swagger = app => {
    const options = new swagger_1.DocumentBuilder()
        .setTitle('Timesheet')
        .setDescription('The API for the timesheets chrome extension.')
        .setVersion('1.0')
        .setBasePath(config_1.default.APP_DOMAIN)
        .addBearerAuth('Authorization', 'header')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, options);
    swagger_1.SwaggerModule.setup('api/swagger', app, document);
    const userOptions = new swagger_1.DocumentBuilder()
        .setTitle('Users')
        .setDescription('Users API.')
        .setVersion('1.0')
        .addTag('Users')
        .addBearerAuth('Authorization', 'header')
        .build();
    const userDocument = swagger_1.SwaggerModule.createDocument(app, userOptions, {
        include: [user_module_1.UserModule],
    });
    swagger_1.SwaggerModule.setup('api/swagger/users', app, userDocument);
    const projectOptions = new swagger_1.DocumentBuilder()
        .setTitle('Projects')
        .setDescription('Projects API.')
        .setVersion('1.0')
        .addTag('Projects')
        .addBearerAuth('Authorization', 'header')
        .build();
    const projectDocument = swagger_1.SwaggerModule.createDocument(app, projectOptions, {
        include: [project_module_1.ProjectModule],
    });
    swagger_1.SwaggerModule.setup('api/swagger/projects', app, projectDocument);
    const clientOptions = new swagger_1.DocumentBuilder()
        .setTitle('Clients')
        .setDescription('Clients API')
        .setVersion('1.0')
        .addTag('Clients')
        .addBearerAuth('Authorization', 'header')
        .build();
    const clientDocument = swagger_1.SwaggerModule.createDocument(app, clientOptions, {
        include: [client_module_1.ClientModule],
    });
    swagger_1.SwaggerModule.setup('api/swagger/clients', app, clientDocument);
    const timesheetOptions = new swagger_1.DocumentBuilder()
        .setTitle('Timesheets')
        .setDescription('Timesheets API')
        .setVersion('1.0')
        .addTag('Timesheets')
        .addBearerAuth('Authorization', 'header')
        .build();
    const timesheetDocument = swagger_1.SwaggerModule.createDocument(app, timesheetOptions, {
        include: [client_module_1.ClientModule],
    });
    swagger_1.SwaggerModule.setup('api/swagger/timesheets', app, timesheetDocument);
};
//# sourceMappingURL=swagger.js.map
