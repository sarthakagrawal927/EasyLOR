import { ApolloContext } from "../../../context";
import { Faculty, LorApplication, QueryResolvers, Student } from "@/types";
import { userSelect } from "../user/userSelect";
import checkAuth from "../../../checkAuth";
export const queries: QueryResolvers<ApolloContext, Faculty> = {
	async getFaculties(_, {}, { prisma, req }) {
		checkAuth(req);
		const faculties: Faculty[] | null = await prisma.faculty.findMany({
			select: {
				user: { select: userSelect },
				lorDraftTemplates: true,
				reminders: true,
				lorApplications: {
					include: {
						student: { include: { user: { select: userSelect } } },
						faculty: { include: { user: { select: userSelect } } },
					},
				},
			},
		});

		return faculties;
	},

	async getFacultyByUserID(_, args: { id: string }, { prisma, req }: ApolloContext) {
		const user = checkAuth(req);
		if (process.env.NODE_ENV === "production" && args.id !== user.id) {
			throw new Error("INVALID_ACTION: Cannot fetch a different user");
		}
		const faculty: Faculty | null = await prisma.faculty.findUnique({
			where: {
				userID: args.id,
			},
			include: {
				user: { select: userSelect },
				lorApplications: {
					include: {
						student: { include: { user: { select: userSelect } } },
						faculty: { include: { user: { select: userSelect } } },
					},
				},
				reminders: true,
			},
		});

		return faculty;
	},

	async getPastApplicationsByFacultyID(_, args: { id: string }, { prisma }: ApolloContext) {
		const lorApplications: LorApplication[] | null = await prisma.lORApplication.findMany({
			where: {
				facultyID: args.id,
			},
			include: {
				student: { include: { user: { select: userSelect } } },
				faculty: { include: { user: { select: userSelect } } },
			},
		});

		const allStudents: Student[] | null = await prisma.student.findMany({
			include: {
				user: { select: userSelect },
				lorApplications: {
					include: {
						student: { include: { user: { select: userSelect } } },
						faculty: { include: { user: { select: userSelect } } },
					},
				},
				reminders: true,
				testScores: true,
			},
		});

		const students: Student[] | null = [];

		for (const lorApp of lorApplications) {
			const student: Student | undefined = allStudents.find(student => student.user.id === lorApp.student.user.id);

			if (student) students.push(student);
		}

		return students;
	},
};
