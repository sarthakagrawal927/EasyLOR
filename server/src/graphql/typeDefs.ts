import { gql } from "apollo-server";

const typeDefs = gql`
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
		status: Status!
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
		reminders: [Reminder]!
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
		getFacultyByUserID(id: Int!): Faculty
	}

	input CreateUserInput {
		email: String!
		password: String!
		firstName: String!
		lastName: String
		departmentID: Int!
		institution: String!
		contact: String!
		profilePhoto: String!
		regNo: String
		userType: UserType!
	}

	type UserReturn {
		email: String!
		firstName: String!
		lastName: String
		department: Department!
		institution: String!
		contact: String!
		profilePhoto: String!
		userType: UserType!
		token: String!
	}

	input LoginUserInput {
		email: String!
		password: String!
	}

	input CreateLORApplicationInput {
		dueDate: DateTime!
		statementOfPurpose: String!
		course: String!
		university: String!
		draftURL: String
		studentID: Int!
		facultyID: Int!
	}

	input UpdateLORInput {
		id: Int!
		dueDate: DateTime
		statementOfPurpose: String
		course: String
		university: String
		draftURL: String
		status: Status
	}

	input CreateReminderInput {
		message: String!
		facultyID: Int!
		studentID: Int!
	}

	input UpdateReminderInput {
		id: Int!
		message: String
		viewed: Boolean
	}

	type Mutation {
		loginUser(loginUserInput: LoginUserInput!): UserReturn!
		createUser(createUserInput: CreateUserInput!): UserReturn!
		createLORApplication(createLORApplicationInput: CreateLORApplicationInput!): LORApplication!
		createReminder(createReminderInput: CreateReminderInput!): Reminder!

		updateLOR(updateLORInput: UpdateLORInput!): LORApplication!
		updateReminder(updateReminderInput: UpdateReminderInput!): Reminder!
	}
`;
export default typeDefs;
