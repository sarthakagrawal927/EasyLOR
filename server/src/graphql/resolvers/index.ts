import departmentResolvers from "./department";
import lorAppResolvers from "./lorApplication";
import studentResolvers from "./student";
import userResolvers from "./user";
import reminderResolvers from "./reminder/index";
import facultyResolvers from "./faculty/index";
import adminResolvers from "./admin";

const resolvers = {
	Query: {
		...departmentResolvers.Query,
		...studentResolvers.Query,
		...userResolvers.Query,
		...facultyResolvers.Query,
		...reminderResolvers.Query,
		...lorAppResolvers.Query,
		...adminResolvers.Query,
	},
	Mutation: {
		...lorAppResolvers.Mutation,
		...userResolvers.Mutation,
		...reminderResolvers.Mutation,
		...studentResolvers.Mutation,
		...facultyResolvers.Mutation,
	},
};

export default resolvers;
