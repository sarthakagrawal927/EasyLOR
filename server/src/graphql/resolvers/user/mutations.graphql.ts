import { Prisma } from "@prisma/client";
import bcrypt from "bcryptjs";
import { generateToken, validateCreateUserInput, validateLoginInput } from "./utils";
import { ApolloContext } from "../../../context";
import { MutationResolvers, UserReturn } from "@/types";
import { UserInputError } from "apollo-server";

export const mutations: MutationResolvers<ApolloContext> = {
	async createUser(_, { createUserInput }, { prisma }: ApolloContext) {
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
			password: password,
			profilePhoto: createUserInput.profilePhoto,
			userType: createUserInput.userType,
		};

		if (newUser.userType === "STUDENT") {
			newUser = {
				...newUser,
				Student: {
					create: {
						regNo: createUserInput.regNo ?? "",
					},
				},
			};
		}

		if (newUser.userType === "FACULTY") {
			newUser = {
				...newUser,
				Faculty: {
					create: {
						lorDraftTemplates: [],
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

		const userReturn: UserReturn = {
			contact: user.contact,
			department: userDepartment!,
			email: user.email,
			firstName: user.firstName,
			lastName: user.lastName,
			institution: user.institution,
			profilePhoto: user.profilePhoto,
			token: token,
			userType: user.userType,
		};

		return userReturn;
	},

	async loginUser(_, { loginUserInput }, { prisma }: ApolloContext) {
		const { errors, isValid } = await validateLoginInput({
			...loginUserInput,
		});
		if (!isValid) {
			throw new UserInputError("Errors", { errors });
		}

		const user = await prisma.user.findUnique({
			where: {
				email: loginUserInput.email,
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

		const userReturn: UserReturn = {
			firstName: user?.firstName ?? "",
			lastName: user?.lastName ?? "",
			contact: user?.contact ?? "",
			department: userDepartment!,
			email: user?.email ?? "",
			institution: user?.institution ?? "",
			profilePhoto: user?.profilePhoto ?? "",
			token: token,
			userType: user?.userType ?? "STUDENT",
		};

		return userReturn;
	},
};
