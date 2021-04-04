import userResolvers from "./userResolvers";

const resolvers = {
    Query: {
        ...userResolvers.Query,
    },
};

export default resolvers;
