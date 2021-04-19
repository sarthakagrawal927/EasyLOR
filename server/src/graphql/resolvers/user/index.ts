import { queries } from "./queries.graphql";
import { mutations } from "./mutations.graphql";
const userResolvers = {
    Query: {
        ...queries,
    },
    Mutation: {
        ...mutations,
    },
};

export default userResolvers;
