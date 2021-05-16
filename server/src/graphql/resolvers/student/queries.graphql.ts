import { ApolloContext } from "../../../context";
import { QueryResolvers, Student } from "@/types";
import { userSelect } from "../user/userselect";

export const queries: QueryResolvers<ApolloContext, Student> = {
	async getStudentByUserID(_parent, args: { id: string }, { prisma }: ApolloContext) {
		const student: Student | null = await prisma.student.findUnique({
			where: {
				userID: args.id,
			},
			include: {
				lorApplications: true,
				reminders: true,
				testScores: true,
				user: {
					select: userSelect,
				},
			},
		});

		return student;
	},
};
