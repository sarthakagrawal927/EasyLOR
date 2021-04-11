import { queries } from "./queries.graphql";
const departmentResolvers = {
    Query: {
        ...queries,
    },
};

export default departmentResolvers;
