"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const timesheet_service_1 = require("./timesheet.service");
const timesheet_dto_1 = require("./dto/timesheet.dto");
const swagger_1 = require("@nestjs/swagger");
const passport_1 = require("@nestjs/passport");
const user_decorator_1 = require("@user/decorators/user.decorator");
const user_service_1 = require("@user/user.service");
const enum_1 = require("@shared/enum");
let TimesheetController = class TimesheetController {
    constructor(timesheetService, userService) {
        this.timesheetService = timesheetService;
        this.userService = userService;
    }
    getAll(id, page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const timesheets = yield this.timesheetService.getAll(page, limit);
            const userDoc = yield this.userService.getOne(id);
            const user = yield userDoc.get();
            const { role } = user.data();
            if (role === enum_1.ERole.ADMIN) {
                return timesheets;
            }
            let authorizedTimesheets = [];
            for (const timesheet of timesheets) {
                if (timesheet.user.id === id) {
                    authorizedTimesheets.push(timesheet);
                }
            }
            return authorizedTimesheets;
        });
    }
    create(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const userDoc = yield this.userService.getOne(id);
            const user = yield userDoc.get();
            const { email, name } = user.data();
            const timesheet = yield this.timesheetService.create(Object.assign({}, data, { user: {
                    id: user.id,
                    email: email,
                    name: name ? name : '',
                } }));
            const save = yield timesheet.save();
            const newTimesheet = yield save.get();
            return {
                success: true,
                message: 'Successfully created a timesheet.',
                timesheet: Object.assign({}, newTimesheet.data(), { id: newTimesheet.id }),
            };
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.timesheetService.update(id, data);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.timesheetService.delete(id);
        });
    }
};
__decorate([
    common_1.Get(),
    swagger_1.ApiBearerAuth(),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    __param(0, user_decorator_1.CurrentUser()),
    __param(1, common_1.Query('page')),
    __param(2, common_1.Query('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number]),
    __metadata("design:returntype", Promise)
], TimesheetController.prototype, "getAll", null);
__decorate([
    common_1.Post(),
    swagger_1.ApiBearerAuth(),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    __param(0, user_decorator_1.CurrentUser()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, timesheet_dto_1.TimesheetDto]),
    __metadata("design:returntype", Promise)
], TimesheetController.prototype, "create", null);
__decorate([
    common_1.Put(':id'),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TimesheetController.prototype, "update", null);
__decorate([
    common_1.Delete(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TimesheetController.prototype, "delete", null);
TimesheetController = __decorate([
    swagger_1.ApiUseTags('Timesheets'),
    common_1.Controller('api/rest/timesheets'),
    __metadata("design:paramtypes", [timesheet_service_1.TimesheetService,
        user_service_1.UserService])
], TimesheetController);
exports.TimesheetController = TimesheetController;
//# sourceMappingURL=timesheet.controller.js.map