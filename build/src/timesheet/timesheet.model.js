"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = require("@shared/model");
class Timesheet extends model_1.AbstractModel {
    constructor(partial) {
        super(partial);
    }
    getData() {
        const { id, user, task, project, client, date, duration } = this;
        const responseObject = { id, user, task, project, client, date, duration };
        return responseObject;
    }
}
exports.Timesheet = Timesheet;
//# sourceMappingURL=timesheet.model.js.map