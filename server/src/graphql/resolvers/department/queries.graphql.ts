import { ApolloContext } from "../../../context";
import { Department, QueryResolvers } from "@/types";
export const queries: QueryResolvers<ApolloContext, Department> = {
    async getDepartments(_, {}, { prisma }) {
        return await prisma.department.findMany();
    },
};
