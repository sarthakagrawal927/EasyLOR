import { ApolloContext } from "../../../context";
import { QueryResolvers, Student } from "@/types";

export const queries: QueryResolvers<ApolloContext, Student> = {
	async getStudentByUserID(
		_parent,
		args: { id: number },
		{ prisma }: ApolloContext
	) {
		const student: Student | null = await prisma.student.findUnique({
			where: {
				userID: args.id,
			},
			include: {
				lorApplications: true,
				reminders: true,
				testScores: true,
				user: {
					include: {
						department: true,
					},
				},
			},
		});

		return student;
	},
};
