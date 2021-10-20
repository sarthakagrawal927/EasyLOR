import { queries } from "./queries.graphql";
const adminResolvers = {
	Query: {
		...queries,
	},
};

export default adminResolvers;
