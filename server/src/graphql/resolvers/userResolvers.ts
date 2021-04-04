import { ApolloContext } from "../../context";
const userResolvers = {
    Query: {
        // TODO: remove this query later
        async allUsers(_parent: any, _args: any, { prisma }: ApolloContext) {
            return prisma.user.findMany();
        },
    },
};

export default userResolvers;
