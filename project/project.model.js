'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const model_1 = require('../shared/model');
class Project extends model_1.AbstractModel {
    constructor(partial) {
        super(partial);
    }
    getData() {
        const { label, value, client } = this;
        const responseObject = { label, value, client };
        return responseObject;
    }
}
exports.Project = Project;
//# sourceMappingURL=project.model.js.map
