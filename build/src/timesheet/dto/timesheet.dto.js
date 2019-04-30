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
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_1 = require("@nestjs/swagger");
const project_timesheet_dto_1 = require("./project-timesheet.dto");
const client_timesheet_dto_1 = require("./client-timesheet.dto");
class TimesheetDto {
}
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], TimesheetDto.prototype, "task", void 0);
__decorate([
    swagger_1.ApiModelPropertyOptional(),
    __metadata("design:type", project_timesheet_dto_1.ProjectTimesheetDto)
], TimesheetDto.prototype, "project", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", client_timesheet_dto_1.ClientTimesheetDto)
], TimesheetDto.prototype, "client", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Date)
], TimesheetDto.prototype, "date", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], TimesheetDto.prototype, "duration", void 0);
exports.TimesheetDto = TimesheetDto;
//# sourceMappingURL=timesheet.dto.js.map