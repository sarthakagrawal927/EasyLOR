import { queries } from "./queries.graphql";
const studentResolvers = {
	Query: {
		...queries,
	},
};

export default studentResolvers;
