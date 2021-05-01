import { ApolloContext } from "../../../context";
import { Faculty, QueryResolvers } from "@/types";
export const queries: QueryResolvers<ApolloContext, Faculty> = {
    async getFaculties(_, __, { prisma }) {
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
        return (faculties ?? []);
    },

    async getFacultyByUserID(
        _parent: Faculty,
        args: { id: number },
        { prisma }: ApolloContext
    ) {
        const faculty = await prisma.faculty.findUnique({
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
