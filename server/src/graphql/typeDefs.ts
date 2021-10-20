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
		ADMIN
	}

	type User {
		id: String!
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
		id: String!
		message: String!
		faculty: Faculty
		student: Student
		facultyID: String!
		studentID: String!
		viewed: Boolean!
	}

	type TestScore {
		id: String!
		exam: String!
		score: String!
		proofOfResult: String!
	}

	type LORApplication {
		id: String!
		dueDate: DateTime
		statementOfPurpose: String!
		course: String!
		university: String!
		draftURL: String
		student: Student!
		faculty: Faculty!
		status: Status!
		rejectionReason: String
		lorURL: String
	}

	type Student {
		user: User!
		regNo: String!
		appliedUniversities: [String]!
		acceptedUniversity: String
		proofOfAcceptance: String
		testScores: [TestScore]
		lorApplications: [LORApplication]
		reminders: [Reminder]
	}

	type Faculty {
		user: User!
		lorApplications: [LORApplication]
		lorDraftTemplate: String
		reminders: [Reminder]
	}

	type Department {
		id: String!
		name: String!
	}

	type Query {
		getDepartments: [Department]!
		getFaculties: [Faculty]!
		getLORApplications: [LORApplication]!
		getStudentByUserID(id: String!): Student
		getFacultyByUserID(id: String!): Faculty
		getAdminByUserID(id: String!): User
		getPastApplicationsByFacultyID(id: String!): [Student]!
		getRemindersByStudentID(id: String!): [Reminder]!
	}

	input CreateUserInput {
		email: String!
		password: String!
		firstName: String!
		lastName: String
		departmentID: String!
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
		dueDate: DateTime
		statementOfPurpose: String!
		course: String!
		university: String!
		draftURL: String
		studentID: String!
		facultyID: String!
	}

	input UpdateLORApplicationInput {
		id: String!
		dueDate: DateTime
		statementOfPurpose: String
		course: String
		university: String
		draftURL: String
		status: Status
		rejectionReason: String
		lorURL: String
	}

	input TestScoreInput {
		exam: String!
		score: String!
		proofOfResult: String!
	}

	input UpdateStudentInput {
		id: String!
		appliedUniversities: [String!]
		acceptedUniversity: String
		proofOfAcceptance: String
		testScores: [TestScoreInput!]
	}

	input UpdateFacultyInput {
		id: String!
		lorDraftTemplate: String!
	}

	input CreateReminderInput {
		message: String!
		facultyID: String!
		studentID: String!
	}

	input UpdateReminderInput {
		id: String!
		message: String
		viewed: Boolean
	}

	type Mutation {
		loginUser(loginUserInput: LoginUserInput!): UserReturn!
		createUser(createUserInput: CreateUserInput!): UserReturn!
		createLORApplication(createLORApplicationInput: CreateLORApplicationInput!): LORApplication!
		createReminder(createReminderInput: CreateReminderInput!): Reminder!

		updateFaculty(updateFacultyInput: UpdateFacultyInput!): Faculty!

		updateLORApplication(updateLORApplicationInput: UpdateLORApplicationInput!): LORApplication!
		updateReminder(updateReminderInput: UpdateReminderInput!): Reminder!
		updateStudent(updateStudentInput: UpdateStudentInput!): Student!

		deleteLORApplication(id: String!): LORApplication!
		deleteReminder(id: String!): Reminder!
	}
`;
export default typeDefs;
