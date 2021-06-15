import { Prisma } from "@prisma/client";
import bcrypt from "bcryptjs";
import { generateToken, validateCreateUserInput, validateLoginInput } from "./utils";
import { ApolloContext } from "../../../context";
import { MutationResolvers, User, UserReturn } from "@/types";
import { UserInputError } from "apollo-server";

export const mutations: MutationResolvers<ApolloContext> = {
	async createUser(_, { createUserInput }, { prisma }: ApolloContext) {
		const { errors, isValid } = await validateCreateUserInput({
			...createUserInput,
		});
		if (!isValid) {
			throw new UserInputError(Object.values(errors).find(error => error !== null) ?? "", { errors });
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
				student: {
					create: {
						regNo: createUserInput.regNo ?? "",
					},
				},
			};
		}

		if (newUser.userType === "FACULTY") {
			newUser = {
				...newUser,
				faculty: {
					create: {
						lorDraftTemplates: [],
					},
				},
			};
		}

		const user: User = await prisma.user.create({
			data: newUser,
			include: {
				department: true,
			},
		});

		const token = generateToken({
			email: user?.email!,
			id: user?.id!,
			userType: user?.userType!,
		});

		const userReturn: UserReturn = {
			contact: user.contact,
			department: user.department,
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
			throw new UserInputError(Object.values(errors).find(error => error !== null) ?? "", { errors });
		}

		const user: User | null = await prisma.user.findUnique({
			where: {
				email: loginUserInput.email,
			},
			include: {
				department: true,
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
			department: user?.department!,
			email: user?.email ?? "",
			institution: user?.institution ?? "",
			profilePhoto: user?.profilePhoto ?? "",
			token: token,
			userType: user?.userType ?? "STUDENT",
		};

		return userReturn;
	},
};
