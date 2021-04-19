import departmentResolvers from "./department";
import lorAppResolvers from "./lorApplication";
import studentResolvers from "./student";
import userResolvers from "./user/index";

const resolvers = {
    Query: {
        ...departmentResolvers.Query,
        ...studentResolvers.Query,
        ...userResolvers.Query,
    },
    Mutation: {
        ...lorAppResolvers.Mutation,
        ...userResolvers.Mutation,
    },
};

export default resolvers;
