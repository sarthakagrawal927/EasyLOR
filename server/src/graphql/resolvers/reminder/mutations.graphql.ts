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

	async updateReminder(_, { updateReminderInput }, { prisma } : ApolloContext) {
		const reminder: Reminder = await prisma.reminder.update({
			where: {
				id: updateReminderInput.id
			},
			data: {
				message: updateReminderInput.message ?? undefined,
				viewed: updateReminderInput.viewed ?? undefined
			}
		})

		return reminder;
	}
};