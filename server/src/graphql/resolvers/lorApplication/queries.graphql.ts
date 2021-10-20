import { ApolloContext } from "../../../context";
import { LorApplication, QueryResolvers } from "@/types";
import { userSelect } from "../user/userSelect";

export const queries: QueryResolvers<ApolloContext, LorApplication> = {
	async getLORApplications(_, {}, { prisma }: ApolloContext) {
		const lorApplications: LorApplication[] | null = await prisma.lORApplication.findMany({
			where: {
				status: "GRANTED",
			},
			include: {
				student: {
					include: {
						user: {
							select: userSelect,
						},
						testScores: {
							select: {
								id: true,
								exam: true,
								proofOfResult: true,
								score: true,
							},
						},
					},
				},
				faculty: { include: { user: { select: userSelect } } },
			},
		});
		return lorApplications;
	},
};
