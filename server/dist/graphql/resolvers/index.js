"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userResolvers_1 = __importDefault(require("./userResolvers"));
const resolvers = {
    Query: Object.assign({}, userResolvers_1.default.Query),
};
exports.default = resolvers;
//# sourceMappingURL=index.js.map