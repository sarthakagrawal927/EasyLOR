import { ApolloContext } from "../../../context";
import { Department, QueryResolvers } from "@/types";
export const queries: QueryResolvers<ApolloContext> = {
	async getDepartments(_, {}, { prisma }: ApolloContext) {
		const departments: Department[] | null = await prisma.department.findMany();

		return departments;
	},
};
