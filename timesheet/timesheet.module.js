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
const timesheet_service_1 = require('./timesheet.service');
const timesheet_controller_1 = require('./timesheet.controller');
const user_module_1 = require('../user/user.module');
let TimesheetModule = class TimesheetModule {};
TimesheetModule = __decorate(
    [
        common_1.Module({
            imports: [user_module_1.UserModule],
            providers: [timesheet_service_1.TimesheetService],
            controllers: [timesheet_controller_1.TimesheetController],
        }),
    ],
    TimesheetModule,
);
exports.TimesheetModule = TimesheetModule;
//# sourceMappingURL=timesheet.module.js.map
