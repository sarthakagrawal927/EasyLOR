import { ApolloContext } from "../../../context";
import { Reminder, QueryResolvers } from "@/types";
import { userSelect } from "../user/userSelect";
import checkAuth from "../../../checkAuth";

export const queries: QueryResolvers<ApolloContext, Reminder> = {
	async getRemindersByStudentID(_, args: { id: string }, { prisma, req }: ApolloContext) {
		checkAuth(req);
		const reminders: Reminder[] | null = await prisma.reminder.findMany({
			where: {
				studentID: args.id,
			},
			include: {
				faculty: { include: { user: { select: userSelect } } },
				student: { include: { user: { select: userSelect } } },
			},
		});

		return reminders;
	},
};
