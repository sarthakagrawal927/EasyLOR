import { ApolloContext } from "../../../context";
import { LorApplication, MutationResolvers } from "@/types";

export const mutations: MutationResolvers<ApolloContext, LorApplication> = {
	async createLORApplication(_, { createLORApplicationInput }, { prisma }: ApolloContext) {
		const lorApp: LorApplication = await prisma.lORApplication.create({
			data: {	
				dueDate: createLORApplicationInput.dueDate,
				statementOfPurpose: createLORApplicationInput.statementOfPurpose,
				course: createLORApplicationInput.course,
				university: createLORApplicationInput.university,
				draftURL: createLORApplicationInput.draftURL ?? undefined,
				studentID: createLORApplicationInput.studentID,
				facultyID: createLORApplicationInput.facultyID,
			},
		});

		return lorApp;
	},

	async updateLOR(_, { updateLORInput }, { prisma }: ApolloContext) {
		const lorApp: LorApplication = await prisma.lORApplication.update({
			where: {
				id: updateLORInput.id,
			},
			data: {
				dueDate: updateLORInput.dueDate ?? undefined,
				statementOfPurpose: updateLORInput.statementOfPurpose ?? undefined,
				course: updateLORInput.course ?? undefined,
				university: updateLORInput.university ?? undefined,
				draftURL: updateLORInput.draftURL ?? undefined,
				status: updateLORInput.status ?? undefined
			},
		});

		return lorApp;
	},
};
