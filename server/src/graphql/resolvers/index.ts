import departmentResolvers from "./department";
import lorAppResolvers from "./lorApplication";
import studentResolvers from "./student";

const resolvers = {
	Query: {
		...departmentResolvers.Query,
		...studentResolvers.Query,
	},
	Mutation: {
		...lorAppResolvers.Mutation,
	},
};

export default resolvers;
