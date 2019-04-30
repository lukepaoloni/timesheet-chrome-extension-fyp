"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("@nestjs/graphql");
const graphql_2 = require("graphql");
const firebase_1 = require("firebase");
let DateScalar = class DateScalar {
    constructor() {
        this.description = 'Date custom scalar type';
    }
    parseValue(value) {
        const isNumber = typeof value === 'number';
        if (!isNumber) {
            console.log('value is not a number', value);
            if (value.seconds) {
                console.log('value.seconds === true', value.seconds);
                return new Date(value.seconds);
            }
        }
        console.log('value is a number', value);
        return new Date(value);
    }
    serialize(value) {
        const isNumber = typeof value === 'number';
        if (!isNumber) {
            if (value.seconds !== undefined && value.nanoseconds !== undefined) {
                const date = new firebase_1.firestore.Timestamp(value.seconds, value.nanoseconds).toDate();
                return date;
            }
        }
        return value.getTime();
    }
    parseLiteral(ast) {
        if (ast.kind === graphql_2.Kind.INT) {
            return parseInt(ast.value, 10);
        }
        return null;
    }
};
DateScalar = __decorate([
    graphql_1.Scalar('DateTime')
], DateScalar);
exports.DateScalar = DateScalar;
//# sourceMappingURL=date.js.map