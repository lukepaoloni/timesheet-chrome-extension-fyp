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
var __metadata =
    (this && this.__metadata) ||
    function(k, v) {
        if (typeof Reflect === 'object' && typeof Reflect.metadata === 'function')
            return Reflect.metadata(k, v);
    };
var __awaiter =
    (this && this.__awaiter) ||
    function(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function(resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value));
                } catch (e) {
                    reject(e);
                }
            }
            function rejected(value) {
                try {
                    step(generator['throw'](value));
                } catch (e) {
                    reject(e);
                }
            }
            function step(result) {
                result.done
                    ? resolve(result.value)
                    : new P(function(resolve) {
                          resolve(result.value);
                      }).then(fulfilled, rejected);
            }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
Object.defineProperty(exports, '__esModule', { value: true });
const common_1 = require('@nestjs/common');
const service_1 = require('../shared/service');
const database_service_1 = require('../database/database.service');
const project_model_1 = require('./project.model');
const status_enum_1 = require('../shared/enum/status.enum');
let ProjectService = class ProjectService extends service_1.AbstractService {
    constructor(db) {
        super(db, 'projects');
    }
    getCollection() {
        const _super = Object.create(null, {
            getAll: { get: () => super.getAll },
        });
        return __awaiter(this, void 0, void 0, function*() {
            const data = yield _super.getAll.call(this);
            let collection = [];
            data.forEach(datum => {
                const project = new project_model_1.Project(datum);
                collection.push(project.getData());
            });
            return collection;
        });
    }
    getAllByClient(clientId) {
        return __awaiter(this, void 0, void 0, function*() {
            if (!clientId) {
                throw new common_1.UnprocessableEntityException(
                    'You must specify a client ID as a parameter.',
                );
            }
            const collection = yield this.collection.where('clientId', '==', clientId).get();
            return collection.docs.map(doc => {
                return Object.assign({}, doc.data(), { id: doc.id });
            });
        });
    }
    doesProjectExist(data) {
        return __awaiter(this, void 0, void 0, function*() {
            const projects = yield this.getAll();
            if (!data.value) {
                data.value = data.label.toLowerCase().replace(/\W/g, '_');
            }
            if (data.integrations) {
                return projects.find(project => project.integration.id === data.integration.id);
            }
            return projects.find(project => project.value === data.value);
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function*() {
            if (!data.value) {
                data.value = data.label.toLowerCase().replace(/\W/g, '_');
            }
            this.data = data;
            this.data.status = status_enum_1.EStatus.Active;
            return this;
        });
    }
    update(id, data) {
        const _super = Object.create(null, {
            update: { get: () => super.update },
        });
        return __awaiter(this, void 0, void 0, function*() {
            return yield _super.update.call(this, id, data);
        });
    }
};
ProjectService = __decorate(
    [common_1.Injectable(), __metadata('design:paramtypes', [database_service_1.DatabaseService])],
    ProjectService,
);
exports.ProjectService = ProjectService;
//# sourceMappingURL=project.service.js.map
