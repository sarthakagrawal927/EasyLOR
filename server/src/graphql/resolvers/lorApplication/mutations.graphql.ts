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

	async UpdateLORApplication(_, { updateLORApplicationInput }, { prisma }: ApolloContext) {
		const { errors, isValid } = await validateUpdateLORApplicationInput({
			...updateLORApplicationInput,
		});
		if (!isValid) {
			throw new UserInputError("Errors", { errors });
		}

		const lorApp: LorApplication = await prisma.lORApplication.update({
			where: {
				id: updateLORApplicationInput.id,
			},
			data: {
				dueDate: updateLORApplicationInput.dueDate ?? undefined,
				statementOfPurpose: updateLORApplicationInput.statementOfPurpose ?? undefined,
				course: updateLORApplicationInput.course ?? undefined,
				university: updateLORApplicationInput.university ?? undefined,
				draftURL: updateLORApplicationInput.draftURL ?? undefined,
				status: updateLORApplicationInput.status ?? undefined,
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
