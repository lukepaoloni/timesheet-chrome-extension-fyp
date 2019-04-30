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
const service_1 = require("../shared/service");
const database_service_1 = require("@db/database.service");
const timesheet_model_1 = require("./timesheet.model");
let TimesheetService = class TimesheetService extends service_1.AbstractService {
    constructor(db) {
        super(db, 'timesheets');
    }
    getAll(page, limit = 25) {
        return __awaiter(this, void 0, void 0, function* () {
            const timesheets = this.collection.orderBy('date');
            if (page && page > 0) {
                timesheets.startAt(limit * page - limit);
            }
            const timesheetData = yield timesheets.get();
            return timesheetData.docs.map(doc => {
                return Object.assign({}, doc.data(), { id: doc.id });
            });
        });
    }
    getCollection() {
        const _super = Object.create(null, {
            getAll: { get: () => super.getAll }
        });
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield _super.getAll.call(this);
            let collection = [];
            data.forEach(datum => {
                const project = new timesheet_model_1.Timesheet(datum);
                collection.push(project.getData());
            });
            return collection;
        });
    }
    create(data) {
        const _super = Object.create(null, {
            create: { get: () => super.create }
        });
        return __awaiter(this, void 0, void 0, function* () {
            _super.create.call(this, Object.assign({}, data));
            return this;
        });
    }
    update(id, data) {
        const _super = Object.create(null, {
            update: { get: () => super.update }
        });
        return __awaiter(this, void 0, void 0, function* () {
            return yield _super.update.call(this, id, data);
        });
    }
};
TimesheetService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], TimesheetService);
exports.TimesheetService = TimesheetService;
//# sourceMappingURL=timesheet.service.js.map