"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const typeDefs_1 = __importDefault(require("./graphql/typeDefs"));
const resolvers_1 = __importDefault(require("./graphql/resolvers"));
const context_1 = require("./context");
const PORT = process.env.PORT || 4000;
const server = new apollo_server_1.ApolloServer({
    typeDefs: typeDefs_1.default,
    resolvers: resolvers_1.default,
    context: context_1.context,
});
server.listen({ port: PORT }, () => console.log(`🚀 Server listening at: http://localhost:${PORT}`));
//# sourceMappingURL=server.js.map