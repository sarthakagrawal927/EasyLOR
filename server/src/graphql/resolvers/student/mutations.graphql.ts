import { ApolloContext } from "../../../context";
import { Student, MutationResolvers } from "@/types";

export const mutations: MutationResolvers<ApolloContext, Student> = {
	async updateStudent(_, { updateStudentInput }, { prisma }) {
		const student: Student | null = await prisma.student.update({
			where: {
				regNo: updateStudentInput.regNo,
			},
			data: {
				acceptedUniversity: updateStudentInput.acceptedUniversity ?? undefined,
				appliedUniversities: updateStudentInput.appliedUniversities ?? undefined,
				testScores: {
					createMany: {
						data: updateStudentInput.testScores ?? [],
					},
				},
			},
			include: {
				lorApplications: true,
				reminders: true,
				user: {
					include: {
						department: true,
					},
				},
				testScores: true,
			},
		});

		return student;
	},
};
