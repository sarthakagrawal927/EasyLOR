import { gql } from "apollo-server";

const typeDefs = gql`
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
export default typeDefs;
