import { ApolloContext } from "../../../context";
import { LorApplication, QueryResolvers } from "@/types";

export const queries: QueryResolvers<ApolloContext, LorApplication> = {
	async getLORApplications(_, {}, { prisma }: ApolloContext) {
		const lorApplications: LorApplication[] | null = await prisma.lORApplication.findMany();
		return lorApplications;
	},
};
