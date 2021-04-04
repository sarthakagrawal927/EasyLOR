"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const typeDefs = apollo_server_1.gql `
    type User {
        id: ID!
        firstName: String!
        lastName: String!
        email: String!
        password: String!
    }
    type Query {
        allUsers: [User]
    }
`;
exports.default = typeDefs;
//# sourceMappingURL=typeDefs.js.map