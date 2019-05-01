"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const project_model_1 = require("./project.model");
const faker = require("faker");
const enum_1 = require("../shared/enum");
const axios_1 = require("axios");
exports.generateProject = (project) => __awaiter(this, void 0, void 0, function* () {
    const { data } = yield axios_1.default.post('http://localhost:4000/api/rest/projects/', project);
    console.log(data);
});
function Seed(collection = 'projects') {
    return __awaiter(this, void 0, void 0, function* () {
        const label = `${faker.company.companyName()} ${faker.random.word()}`;
        const status = enum_1.EStatus.Active;
        const project = new project_model_1.Project();
        project.label = label;
        project.value = label.toLowerCase().replace(/\W/g, '_');
        project.status = status;
        yield exports.generateProject(project);
    });
}
exports.Seed = Seed;
//# sourceMappingURL=project.seed.js.map