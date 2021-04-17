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

	enum UserType {
		STUDENT
		FACULTY
	}

	type User {
		id: Int!
		email: String!
		firstName: String!
		lastName: String
		department: Department!
		institution: String!
		contact: String!
		profilePhoto: String!
		userType: UserType!
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
		status: Status
	}

	type Student {
		user: User!
		regNo: String!
		appliedUniversities: [String]!
		acceptedUniversity: String
		testScores: [TestScore]!
		lorApplications: [LORApplication]!
		reminders: [Reminder]!
	}

	type Faculty {
		user: User!
		lorApplications: [LORApplication]!
		lorDraftTemplates: [String]!
	}

	type Department {
		id: Int!
		name: String!
	}

	type Query {
		getDepartments: [Department]!
		getFaculties: [Faculty]!
		getApplicationsByFacultyID: [LORApplication]!
		getStudentByUserID(id: Int!): Student
	}

	type Mutation {
		loginUser(email: String!, password: String!): User!
		createUser(
			email: String!
			firstName: String!
			lastName: String
			department: String!
			institution: String!
			contact: String!
			profilePhoto: String!
			userType: UserType!
		): User!
		createLORApplication(
			dueDate: DateTime!
			statementOfPurpose: String!
			course: String!
			university: String!
			draftURL: String
			studentID: Int!
			facultyID: Int!
		): LORApplication!
		createReminder(
			message: String!
			facultyID: Int!
			studentID: Int!
		): Reminder!
	}
`;
exports.default = typeDefs;
//# sourceMappingURL=typeDefs.js.map