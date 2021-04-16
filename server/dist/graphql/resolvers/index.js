"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const department_1 = __importDefault(require("./department"));
const student_1 = __importDefault(require("./student"));
const resolvers = {
    Query: Object.assign(Object.assign({}, department_1.default.Query), student_1.default.Query),
};
exports.default = resolvers;
//# sourceMappingURL=index.js.map