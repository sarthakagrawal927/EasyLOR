import departmentResolvers from "./department";
const resolvers = {
    Query: {
        ...departmentResolvers.Query,
    },
};

export default resolvers;
