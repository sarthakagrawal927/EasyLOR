import { ApolloContext } from "../../../context";
import { QueryResolvers, User } from "@/types";
import checkAuth from "../../../checkAuth";

export const queries: QueryResolvers<ApolloContext, User> = {
	async getAdminByUserID(_parent, args: { id: string }, { prisma, req }: ApolloContext) {
		const user = checkAuth(req);
		if (process.env.NODE_ENV === "production" && args.id !== user.id) {
			throw new Error("INVALID_ACTION: Cannot fetch a different user");
		}

		const admin: User | null = await prisma.user.findUnique({
			where: {
				id: args.id,
			},
			include: {
				department: {
					select: {
						id: true,
						name: true,
					},
				},
			},
		});
		return admin;
	},
};
