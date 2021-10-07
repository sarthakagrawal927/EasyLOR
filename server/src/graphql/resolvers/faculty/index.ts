import { queries } from "./queries.graphql";
import { mutations } from "./mutations.graphql";
const facultyResolvers = {
	Query: {
		...queries,
	},
	Mutation: {
		...mutations,
	},
};

export default facultyResolvers;
