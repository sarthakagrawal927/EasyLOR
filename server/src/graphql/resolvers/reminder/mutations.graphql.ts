import { ApolloContext } from "../../../context";
import { Reminder, MutationResolvers } from "@/types";

export const mutations: MutationResolvers<ApolloContext, Reminder> = {
	async createReminder(_, args, { prisma }: ApolloContext) {
		

		const reminder: Reminder = await prisma.reminder.create({
			data: {
				message:args.message,
				studentID: args.studentID,
				facultyID: args.facultyID,
			
			},
		});

		return reminder;
	},
};