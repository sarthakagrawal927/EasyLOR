import { ApolloContext } from "../../../context";
import { LorApplication, MutationResolvers } from "@/types";
import {
	validateCreateLORApplicationInput,
	validateDeleteLORApplication,
	validateUpdateLORApplicationInput,
} from "./utils";
import { UserInputError } from "apollo-server";

export const mutations: MutationResolvers<ApolloContext, LorApplication> = {
	async createLORApplication(_, { createLORApplicationInput }, { prisma }: ApolloContext) {
		const { errors, isValid } = await validateCreateLORApplicationInput({
			...createLORApplicationInput,
		});
		if (!isValid) {
			throw new UserInputError("Errors", { errors });
		}

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
		const { errors, isValid } = await validateUpdateLORApplicationInput({
			...updateLORInput,
		});
		if (!isValid) {
			throw new UserInputError("Errors", { errors });
		}

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
				status: updateLORInput.status ?? undefined,
			},
		});

		return lorApp;
	},

	async deleteLORApplication(_, args: { id: number }, { prisma }: ApolloContext) {
		const { errors, isValid } = await validateDeleteLORApplication(args.id);
		if (!isValid) {
			throw new UserInputError("Errors", { errors });
		}

		const lorApp: LorApplication = await prisma.lORApplication.delete({
			where: {
				id: args.id,
			},
		});

		return lorApp;
	},
};
