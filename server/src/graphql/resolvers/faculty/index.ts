import { queries } from "./queries.graphql";
const facultyResolvers = {
    Query: {
        ...queries,
    },
};

export default facultyResolvers;