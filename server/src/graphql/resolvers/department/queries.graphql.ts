import { ApolloContext } from "../../../context";
import { QueryResolvers } from "@/types";
export const queries: QueryResolvers<ApolloContext> = {
    async getDepartments(_, {}, { prisma }) {
        return await prisma.department.findMany();
    },
};
