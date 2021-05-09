import { ApolloContext } from "../../../context";
import { Student, MutationResolvers } from "@/types";
import { validateUpdateStudentInput } from "./utils";
import { UserInputError } from "apollo-server";

export const mutations: MutationResolvers<ApolloContext, Student> = {
	async updateStudent(_, { updateStudentInput }, { prisma }: ApolloContext) {
		const { errors, isValid } = await validateUpdateStudentInput({
			...updateStudentInput,
		});
		if (!isValid) {
			throw new UserInputError("Errors", { errors });
		}

		const student: Student | null = await prisma.student.update({
			where: {
				userID: updateStudentInput.id,
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
