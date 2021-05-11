import { ApolloContext } from "../../../context";
import { Faculty, LorApplication, QueryResolvers, Student } from "@/types";

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

	async getPastApplicationsByFacultyID(_, args: { id: string }, { prisma }: ApolloContext) {
		const lorApplications: LorApplication[] | null = await prisma.lORApplication.findMany({
			where: {
				facultyID: args.id,
			},
		});

		const allStudents: Student[] | null = await prisma.student.findMany({
			include: {
				user: {
					include: { department: true },
				},
				lorApplications: true,
				reminders: true,
				testScores: true,
			},
		});

		const students: Student[] | null = [];

		for (const lorApp of lorApplications) {
			const student: Student | undefined = allStudents.find(student => student.user.id === lorApp.studentID);

			if (student) students.push(student);
		}

		return students;
	},
};
