import { ApolloContext } from "../../../context";
import { LorApplication, MutationResolvers } from "@/types";

export const mutations: MutationResolvers<ApolloContext, LorApplication> = {
	async createLORApplication(_, args, { prisma }: ApolloContext) {
		const draftUrl: string | undefined = args.draftURL ?? undefined;

		const lorApp: LorApplication = await prisma.lORApplication.create({
			data: {
				dueDate: args.dueDate,
				statementOfPurpose: args.statementOfPurpose,
				course: args.course,
				university: args.university,
				draftURL: draftUrl,
				studentID: args.studentID,
				facultyID: args.facultyID,
			},
		});

		return lorApp;
	},
};
