import { mutations } from "./mutations.graphql";
import { queries } from "./queries.graphql";
const reminderResolvers = {
	Query: {
		...queries,
	},
	Mutation: {
		...mutations,
	},
};

export default reminderResolvers;
