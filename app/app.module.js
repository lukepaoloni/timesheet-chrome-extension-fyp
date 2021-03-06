'use strict';
var __decorate =
    (this && this.__decorate) ||
    function(decorators, target, key, desc) {
        var c = arguments.length,
            r =
                c < 3
                    ? target
                    : desc === null
                    ? (desc = Object.getOwnPropertyDescriptor(target, key))
                    : desc,
            d;
        if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if ((d = decorators[i]))
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
Object.defineProperty(exports, '__esModule', { value: true });
const common_1 = require('@nestjs/common');
const typeorm_1 = require('@nestjs/typeorm');
const database_module_1 = require('../database/database.module');
const config_1 = require('./config');
const user_module_1 = require('../user/user.module');
const date_1 = require('../scalar/date');
const project_module_1 = require('../project/project.module');
const client_module_1 = require('../client/client.module');
const timesheet_module_1 = require('../timesheet/timesheet.module');
const auth_module_1 = require('../auth/auth.module');
let imports = [
    database_module_1.DatabaseModule,
    auth_module_1.AuthModule,
    user_module_1.UserModule,
    project_module_1.ProjectModule,
    client_module_1.ClientModule,
    timesheet_module_1.TimesheetModule,
];
if (config_1.default.TYPEORM_CONNECTION) {
    imports.push(typeorm_1.TypeOrmModule.forRoot());
}
let AppModule = class AppModule {};
AppModule = __decorate(
    [
        common_1.Module({
            imports,
            controllers: [],
            providers: [date_1.DateScalar],
        }),
    ],
    AppModule,
);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map
