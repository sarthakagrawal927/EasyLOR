import { mutations } from "./mutations.graphql";
const lorAppResolvers = {
	Mutation: {
		...mutations,
	},
};

export default lorAppResolvers;
