import { ApolloContext } from "../../../context";
import { QueryResolvers, Student } from "@/types";
import { userSelect } from "../user/userSelect";

export const queries: QueryResolvers<ApolloContext, Student> = {
	async getStudentByUserID(_parent, args: { id: string }, { prisma }: ApolloContext) {
		const student: Student | null = await prisma.student.findUnique({
			where: {
				userID: args.id,
			},
			include: {
				lorApplications: {
					include: {
						student: { include: { user: { select: userSelect } } },
						faculty: { include: { user: { select: userSelect } } },
					},
				},
				reminders: true,
				testScores: true,
				user: { select: userSelect },
			},
		});

		return student;
	},
};
