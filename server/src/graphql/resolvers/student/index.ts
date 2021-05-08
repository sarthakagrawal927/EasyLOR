import { queries } from "./queries.graphql";
import { mutations } from "./mutations.graphql";
const studentResolvers = {
	Query: {
		...queries,
	},
	Mutation:{
		...mutations,
	},
	
};

export default studentResolvers;
