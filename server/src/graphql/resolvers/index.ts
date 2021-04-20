import departmentResolvers from "./department";
import lorAppResolvers from "./lorApplication";
import studentResolvers from "./student";
import userResolvers from "./user";
import reminderResolvers from './reminder/index';

const resolvers = {
    Query: {
        ...departmentResolvers.Query,
        ...studentResolvers.Query,
        ...userResolvers.Query,
    },
    Mutation: {
        ...lorAppResolvers.Mutation,
        ...userResolvers.Mutation,
		...reminderResolvers.Mutation,
    },
};

export default resolvers;
