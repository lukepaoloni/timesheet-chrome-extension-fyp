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
const swagger_1 = require("@nestjs/swagger");
const project_service_1 = require("./project.service");
const project_dto_1 = require("./dto/project.dto");
const passport_1 = require("@nestjs/passport");
let ProjectController = class ProjectController {
    constructor(projectService) {
        this.projectService = projectService;
    }
    getAll(clientId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.projectService.getAllByClient(clientId);
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const projectExists = yield this.projectService.doesProjectExist(data);
            if (!projectExists) {
                const project = yield this.projectService.create(data);
                const save = yield project.save();
                const newProject = yield save.get();
                return {
                    success: true,
                    message: `You've successfully created a project.`,
                    project: Object.assign({ id: newProject.id }, newProject.data()),
                };
            }
            const updatedProject = Object.assign(projectExists, data);
            const id = updatedProject.id;
            delete updatedProject.id;
            yield this.projectService.update(id, updatedProject);
            return {
                success: true,
                message: `You've successfully updated ${updatedProject.label}`,
                id,
                project: updatedProject,
            };
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.projectService.update(id, data);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.projectService.delete(id);
        });
    }
};
__decorate([
    common_1.Get(),
    __param(0, common_1.Query('clientId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "getAll", null);
__decorate([
    common_1.Post(),
    swagger_1.ApiBearerAuth(),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [project_dto_1.ProjectDto]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "create", null);
__decorate([
    common_1.Put(':id'),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "update", null);
__decorate([
    common_1.Delete(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "delete", null);
ProjectController = __decorate([
    swagger_1.ApiUseTags('Projects'),
    common_1.Controller('api/rest/projects'),
    __metadata("design:paramtypes", [project_service_1.ProjectService])
], ProjectController);
exports.ProjectController = ProjectController;
//# sourceMappingURL=project.controller.js.map