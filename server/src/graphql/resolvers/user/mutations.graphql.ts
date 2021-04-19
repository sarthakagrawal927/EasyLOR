import { Prisma } from "@prisma/client";
import { ApolloContext } from "../../../context";
import { MutationResolvers, UserReturn } from "@/types";
export const mutations: MutationResolvers<ApolloContext> = {
    async createUser(_, args, { prisma }): Promise<UserReturn> {
        let newUser: Prisma.UserCreateInput = {
            firstName: args.createUserInput.firstName,
            lastName: args.createUserInput.lastName ?? "",
            email: args.createUserInput.email,
            contact: args.createUserInput.contact,
            department: {
                connect: {
                    id: args.createUserInput.departmentID,
                },
            },
            institution: args.createUserInput.institution,
            password: args.createUserInput.password,
            profilePhoto: args.createUserInput.profilePhoto,
            userType: args.createUserInput.userType,
        };
        if (newUser.userType === "STUDENT") {
            newUser = {
                ...newUser,
                Student: {
                    create: {
                        regNo: args.createUserInput.regNo,
                    },
                },
            };
        }

        const createdUser = await prisma.user.create({
            data: newUser,
        });
        const userDepartment = await prisma.department.findUnique({
            where: {
                id: createdUser.departmentID,
            },
        });
        let user: UserReturn = {
            contact: createdUser.contact,
            department: userDepartment!,
            email: createdUser.email,
            firstName: createdUser.firstName,
            lastName: createdUser.lastName,
            institution: createdUser.institution,
            profilePhoto: createdUser.profilePhoto,
            token: "somerandomtokenfornow",
            userType: createdUser.userType,
        };

        return user;
    },
};
