import { ApolloContext } from "../../../context";
import { LorApplication, MutationResolvers, Status } from "@/types";

export const mutations: MutationResolvers<ApolloContext, LorApplication> = {
	async createLORApplication(_, args, { prisma }: ApolloContext) {
		const draftURL: string | undefined = args.draftURL ?? undefined;

		const lorApp: LorApplication = await prisma.lORApplication.create({
			data: {
				dueDate: args.dueDate,
				statementOfPurpose: args.statementOfPurpose,
				course: args.course,
				university: args.university,
				draftURL: draftURL,
				studentID: args.studentID,
				facultyID: args.facultyID,
			},
		});

		return lorApp;
	},

	async updateLOR(_, args, { prisma }: ApolloContext) {
		const dueDate: Date | undefined = args.dueDate ?? undefined;
		const statementOfPurpose: string | undefined =
			args.statementOfPurpose ?? undefined;
		const course: string | undefined = args.course ?? undefined;
		const university: string | undefined = args.university ?? undefined;
		const draftURL: string | undefined = args.draftURL ?? undefined;
		const status: Status | undefined = args.status ?? undefined;

		const lorApp: LorApplication = await prisma.lORApplication.update({
			where: {
				id: args.id,
			},
			data: {
				dueDate: dueDate,
				statementOfPurpose: statementOfPurpose,
				course: course,
				university: university,
				draftURL: draftURL,
				status: status,
			},
		});

		return lorApp;
	},
};
