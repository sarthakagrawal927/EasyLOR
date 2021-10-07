import { ApolloContext } from "../../../context";
import { MutationResolvers, Faculty } from "@/types";
import checkAuth from "../../../checkAuth";
import { userSelect } from "../user/userSelect";

export const mutations: MutationResolvers<ApolloContext, Faculty> = {
	async updateFaculty(_, { updateFacultyInput }, { prisma, req }: ApolloContext) {
		const user = checkAuth(req);
		if (process.env.NODE_ENV === "production" && updateFacultyInput.id !== user.id) {
			throw new Error("INVALID_ACTION: Faculty can only be updated by authorized user");
		}

		const faculty: Faculty = await prisma.faculty.update({
			where: {
				userID: updateFacultyInput.id,
			},
			data: {
				lorDraftTemplate: updateFacultyInput.lorDraftTemplate,
			},
			include: { user: { select: userSelect } },
		});

		console.log(faculty);
		return faculty;
	},
};
