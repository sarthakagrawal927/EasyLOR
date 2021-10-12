import { mutations } from "./mutations.graphql";
import { queries } from "./queries.graphql";
const lorAppResolvers = {
	Query: {
		...queries,
	},
	Mutation: {
		...mutations,
	},
};

export default lorAppResolvers;
