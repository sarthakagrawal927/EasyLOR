import { ApolloContext } from "../../../context";
import { QueryResolvers, Student } from "@/types";
import { userSelect } from "../user/userSelect";
import checkAuth from "../../../checkAuth";

export const queries: QueryResolvers<ApolloContext, Student> = {
	async getStudentByUserID(_parent, args: { id: string }, { prisma, req }: ApolloContext) {
		const user = checkAuth(req);
		if (process.env.NODE_ENV === "production" && args.id !== user.id) {
			throw new Error("INVALID_ACTION: Cannot fetch a different user");
		}
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
