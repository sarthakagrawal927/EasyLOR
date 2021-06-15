import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { CreateUserInput, LoginUserInput } from "@/types";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type LoginError = {
	email: string | null;
	password: string | null;
};

type CreateUserError = {
	contact: string | null;
	departmentID: string | null;
	email: string | null;
	firstName: string | null;
	institution: string | null;
	password: string | null;
	profilePhoto: string | null;
	regNo: string | null;
	userType: string | null;
};

export type PayloadData = {
	id: string;
	email: string;
	userType: "STUDENT" | "FACULTY";
};

export const validateCreateUserInput = async ({
	email,
	password,
	firstName,
	departmentID,
	institution,
	contact,
	profilePhoto,
	regNo,
	userType,
}: CreateUserInput) => {
	const errors: CreateUserError = {
		email: null,
		password: null,
		firstName: null,
		departmentID: null,
		institution: null,
		contact: null,
		profilePhoto: null,
		regNo: null,
		userType: null,
	};

	const isPhoneNumber: RegExp = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
	const isEmail: RegExp = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;

	if (email.trim() === "") {
		errors.email = "Email must not be empty";
	} else if (!email.match(isEmail)) errors.email = "Email must be a valid email";

	if (password.trim() === "") errors.password = "Password must not be empty";
	else if (password.length < 5) errors.password = "Password must be at least 5 characters";

	if (firstName.trim() === "") errors.firstName = "First name should not be empty";

	if (departmentID.trim() === "") {
		errors.departmentID = "Department ID must not be empty";
	} else {
		const department = await prisma.department.findUnique({
			where: {
				id: departmentID,
			},
		});
		if (!department) errors.departmentID = "Department with this ID does not exist";
	}

	if (institution.trim() === "") errors.institution = "Institution cannot be empty";

	if (!contact.trim().match(isPhoneNumber)) errors.contact = "Contact is not a valid phone number";

	if (profilePhoto.trim() === "") errors.profilePhoto === "Profile photo cannot be empty";

	if (userType !== "STUDENT" && userType !== "FACULTY") {
		errors.userType = "userType is not among accepted types";
	}

	if (userType === "STUDENT") {
		if (regNo?.trim() === "" || regNo == null) {
			errors.regNo = "Registration number is required for students";
		} else {
			const existingUserWithSameRegNo = await prisma.student.findUnique({
				where: {
					regNo: regNo ?? undefined,
				},
			});
			if (existingUserWithSameRegNo) {
				errors.regNo = "Student with this registration number is already registered";
			}
		}
	}

	const existingUserWithSameEmail = await prisma.user.findUnique({
		where: {
			email: email,
		},
	});
	if (existingUserWithSameEmail) {
		errors.email = "User with this email is already taken";
	}

	const existingUserWithSameContact = await prisma.user.findUnique({
		where: {
			contact: contact,
		},
	});
	if (existingUserWithSameContact) {
		errors.contact = "User with this contact is already taken";
	}

	const existingUserWithSameProfilePhoto = await prisma.user.findUnique({
		where: {
			profilePhoto: profilePhoto,
		},
	});
	if (existingUserWithSameProfilePhoto) {
		errors.profilePhoto = "User with this Profile Photo is already taken";
	}

	return {
		errors: errors,
		isValid: Object.values(errors).every(value => value === null),
	};
};

export const validateLoginInput = async ({ email, password }: LoginUserInput) => {
	const errors: LoginError = {
		email: null,
		password: null,
	};

	const isEmail: RegExp = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;

	if (email.trim() === "") {
		errors.email = "Email must not be empty";
	} else if (!email.match(isEmail)) {
		errors.email = "Email must be valid email";
	} else if (password.trim() === "") {
		errors.password = "Password must not be empty";
	} else {
		const user = await prisma.user.findUnique({
			where: {
				email: email,
			},
		});

		if (!user) {
			errors.email = "User not found";
		} else {
			const match = await bcrypt.compare(password, user?.password!);
			if (!match) errors.password = "Invalid password";
		}
	}

	return {
		errors: errors,
		isValid: Object.values(errors).every(value => value === null),
	};
};

export function generateToken(payload: PayloadData) {
	return jwt.sign(
		{
			id: payload.id,
			email: payload.email,
			userType: payload.userType,
		},
		process.env.SECRET_KEY!,
		{
			expiresIn: "2h",
		}
	);
}
