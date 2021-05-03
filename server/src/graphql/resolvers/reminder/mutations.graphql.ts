import { ApolloContext } from "../../../context";
import { Reminder, MutationResolvers } from "@/types";
import { validateCreateReminderInput, validateUpdateReminderInput } from "./utils";
import { UserInputError } from "apollo-server";

export const mutations: MutationResolvers<ApolloContext, Reminder> = {
	async createReminder(_, { createReminderInput }, { prisma }: ApolloContext) {
		const { errors, isValid } = await validateCreateReminderInput({
			...createReminderInput,
		});
		if (!isValid) {
			throw new UserInputError("Errors", { errors });
		}

		const reminder: Reminder = await prisma.reminder.create({
			data: {
				message: createReminderInput.message,
				studentID: createReminderInput.studentID,
				facultyID: createReminderInput.facultyID,
			},
		});

		return reminder;
	},

	async updateReminder(_, { updateReminderInput }, { prisma }: ApolloContext) {
		const { errors, isValid } = await validateUpdateReminderInput({
			...updateReminderInput,
		});
		if (!isValid) {
			throw new UserInputError("Errors", { errors });
		}

		const reminder: Reminder = await prisma.reminder.update({
			where: {
				id: updateReminderInput.id,
			},
			data: {
				message: updateReminderInput.message ?? undefined,
				viewed: updateReminderInput.viewed ?? undefined,
			},
		});

		return reminder;
	},
};
