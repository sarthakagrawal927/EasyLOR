import { ApolloContext } from "../../../context";
import { Student, MutationResolvers } from "@/types";
import { validateUpdateStudentInput } from "./utils";
import { UserInputError } from "apollo-server";
import { userSelect } from "../user/userSelect";
import checkAuth from "../../../checkAuth";

export const mutations: MutationResolvers<ApolloContext, Student> = {
	async updateStudent(_, { updateStudentInput }, { prisma, req }: ApolloContext) {
		const user = checkAuth(req);
		if (process.env.NODE_ENV === "production" && updateStudentInput.id !== user.id) {
			throw new Error("INVALID_ACTION: Cannot update a different user");
		}
		const { errors, isValid } = await validateUpdateStudentInput({
			...updateStudentInput,
		});
		if (!isValid) {
			throw new UserInputError(Object.values(errors).find(error => error !== null) ?? "", { errors });
		}

		const student: Student | null = await prisma.student.update({
			where: {
				userID: updateStudentInput.id,
			},
			data: {
				acceptedUniversity: updateStudentInput.acceptedUniversity ?? undefined,
				proofOfAcceptance: updateStudentInput.proofOfAcceptance ?? undefined,
				appliedUniversities: updateStudentInput.appliedUniversities ?? undefined,
				testScores: {
					createMany: {
						data: updateStudentInput.testScores ?? [],
					},
				},
			},
			include: {
				lorApplications: {
					include: {
						student: { include: { user: { select: userSelect } } },
						faculty: { include: { user: { select: userSelect } } },
					},
				},
				reminders: true,
				user: { select: userSelect },
				testScores: true,
			},
		});

		return student;
	},
};
