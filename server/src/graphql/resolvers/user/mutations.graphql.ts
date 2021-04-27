import { Prisma } from "@prisma/client";
import bcrypt from "bcryptjs";
import {
    generateToken,
    validateCreateUserInput,
    validateLoginInput,
} from "./utils";
import { ApolloContext } from "../../../context";
import { MutationResolvers, UserReturn } from "@/types";
import { UserInputError } from "apollo-server";

export const mutations: MutationResolvers<ApolloContext> = {
    async createUser(_, { createUserInput }, { prisma }): Promise<UserReturn> {
        const { errors, isValid } = await validateCreateUserInput({
            ...createUserInput,
        });
        if (!isValid) {
            throw new UserInputError("Errors", { errors });
        }

        const password = await bcrypt.hash(createUserInput.password, 12);

        let newUser: Prisma.UserCreateInput = {
            firstName: createUserInput.firstName,
            lastName: createUserInput.lastName ?? "",
            email: createUserInput.email,
            contact: createUserInput.contact,
            department: {
                connect: {
                    id: createUserInput.departmentID,
                },
            },
            institution: createUserInput.institution,
            password,
            profilePhoto: createUserInput.profilePhoto,
            userType: createUserInput.userType,
        };
        if (newUser.userType === "STUDENT") {
            newUser = {
                ...newUser,
                Student: {
                    create: {
                        regNo: createUserInput.regNo,
                    },
                },
            };
        }

        const user = await prisma.user.create({
            data: newUser,
        });
        const userDepartment = await prisma.department.findUnique({
            where: {
                id: user.departmentID,
            },
        });
        const token = generateToken({
            email: user?.email!,
            id: user?.id!,
            userType: user?.userType!,
        });
        return {
            contact: user.contact,
            department: userDepartment!,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            institution: user.institution,
            profilePhoto: user.profilePhoto,
            token,
            userType: user.userType,
        };
    },
    async loginUser(_, { email, password }, { prisma }) {
        const { errors, isValid } = await validateLoginInput(email, password);
        if (!isValid) {
            throw new UserInputError("Errors", { errors });
        }
        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });
        const userDepartment = await prisma.department.findUnique({
            where: {
                id: user?.departmentID,
            },
        });
        const token = generateToken({
            email: user?.email!,
            id: user?.id!,
            userType: user?.userType!,
        });

        return {
            firstName: user?.firstName ?? "",
            lastName: user?.lastName ?? "",
            contact: user?.contact ?? "",
            department: userDepartment!,
            email: user?.email ?? "",
            institution: user?.institution ?? "",
            profilePhoto: user?.profilePhoto ?? "",
            token,
            userType: user?.userType ?? "STUDENT",
        };
    },
};
