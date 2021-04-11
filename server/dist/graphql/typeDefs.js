"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const typeDefs = apollo_server_1.gql `
    scalar DateTime
    enum Status {
        PENDING
        GRANTED
        REJECTED
    }
    type Reminder {
        id: Int!
        message: String!
        facultyID: Int!
        studentID: Int!
        viewed: Boolean!
    }
    type TestScore {
        id: Int!
        exam: String!
        score: String!
    }
    type LORApplication {
        id: Int!
        dueDate: DateTime!
        statementOfPurpose: String!
        course: String!
        university: String!
        draftURL: String
        studentID: Int!
        facultyID: Int!
        status: Status!
    }
    type Student {
        id: Int!
        regNo: String!
        email: String!
        password: String!
        firstName: String!
        lastName: String
        department: String!
        institution: String!
        contact: String!
        profilePhoto: String!
        appliedUniversities: [String]
        acceptedUniversity: String
        testScores: [TestScore]
        lorApplications: [LORApplication]
        reminders: [Reminder]
    }
    type Faculty {
        id: Int!
        email: String!
        password: String!
        firstName: String!
        lastName: String
        department: String!
        institution: String!
        contact: String!
        profilePhoto: String!
        lorApplications: [LORApplication]
        lorDraftTemplates: [String]
    }

    type Department {
        id: Int!
        name: String!
    }

    type Query {
        getDepartments: [Department]
    }
`;
exports.default = typeDefs;
//# sourceMappingURL=typeDefs.js.map