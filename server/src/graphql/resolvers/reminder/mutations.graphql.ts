import { ApolloContext } from "../../../context";
import { Reminder, MutationResolvers } from "@/types";

export const mutations: MutationResolvers<ApolloContext, Reminder> = {
	async createReminder(_, { createReminderInput }, { prisma }: ApolloContext) {
		const reminder: Reminder = await prisma.reminder.create({
			data: {
				message: createReminderInput.message,
				studentID: createReminderInput.studentID,
				facultyID: createReminderInput.facultyID,
			},
		});

		return reminder;
	},
};