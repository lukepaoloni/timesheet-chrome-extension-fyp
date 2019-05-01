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
const faker = require("faker");
const enum_1 = require("../shared/enum");
const axios_1 = require("axios");
const client_model_1 = require("./client.model");
exports.generateClient = (client) => __awaiter(this, void 0, void 0, function* () {
    const { data } = yield axios_1.default.post('http://localhost:4000/api/rest/clients/', client);
    console.log(data);
});
function Seed(collection = 'clients') {
    return __awaiter(this, void 0, void 0, function* () {
        const label = faker.company.companyName();
        const status = enum_1.EStatus.Active;
        const client = new client_model_1.Client();
        client.label = label;
        client.value = label.toLowerCase().replace(/\W/g, '_');
        client.status = status;
        yield exports.generateClient(client);
    });
}
exports.Seed = Seed;
//# sourceMappingURL=client.seed.js.map