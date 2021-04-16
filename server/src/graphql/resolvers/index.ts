import departmentResolvers from "./department";
import studentResolvers from "./student";

const resolvers = {
	Query: {
		...departmentResolvers.Query,
		...studentResolvers.Query,
	},
};

export default resolvers;
