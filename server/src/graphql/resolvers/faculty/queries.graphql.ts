import { ApolloContext } from "../../../context";
import { Faculty, QueryResolvers } from "@/types";
export const queries: QueryResolvers<ApolloContext, Faculty> = {
	async getFaculties(_, {}, { prisma }: ApolloContext) {
		const faculties: Faculty[] | null = await prisma.faculty.findMany({
			select: {
				user: {
					include: {
						department: true,
					},
				},
				lorDraftTemplates: true,
				reminders: true,
				lorApplications: true,
			},
		});

		return faculties;
	},

	async getFacultyByUserID(_, args: { id: string }, { prisma }: ApolloContext) {
		const faculty: Faculty | null = await prisma.faculty.findUnique({
			where: {
				userID: args.id,
			},
			include: {
				user: {
					include: {
						department: true,
					},
				},
				lorApplications: true,
				reminders: true,
			},
		});

		return faculty;
	},
};
