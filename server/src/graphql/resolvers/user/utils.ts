import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

type LoginError = {
    email: string | null;
    password: string | null;
};

export const validateLoginInput = async (email: string, password: string) => {
    const errors: LoginError = {
        email: null,
        password: null,
    };
    if (email.trim() === "") {
        errors.email = "Email must not be empty";
    } else {
        const isEmail: RegExp = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
        if (!email.match(isEmail)) {
            errors.email = "Email must be valid email";
        }
    }
    if (password === "") {
        errors.password = "Password must not be empty";
    } else {
        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });
        if (!user) errors.email = "User not found";
        else {
            const match = await bcrypt.compare(password, user?.password!);
            if (!match) errors.password = "Invalid password";
        }
    }
    return {
        errors,
        isValid: Object.values(errors).every((value) => value === null),
    };
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

type CreateUserInput = {
    contact: string;
    departmentID: number;
    email: string;
    firstName: string;
    institution: string;
    password: string;
    profilePhoto: string;
    regNo: string;
    userType: string;
    lastName?: string | null;
};

export const validateCreateUserInput = async ({
    contact,
    departmentID,
    email,
    firstName,
    institution,
    password,
    profilePhoto,
    regNo,
    userType,
}: CreateUserInput) => {
    const errors: CreateUserError = {
        contact: null,
        departmentID: null,
        email: null,
        firstName: null,
        institution: null,
        password: null,
        profilePhoto: null,
        regNo: null,
        userType: null,
    };
    const isPhoneNumber: RegExp = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

    if (email.trim() === "") {
        errors.email = "Email must not be empty";
    } else {
        const isEmail: RegExp = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
        if (!email.match(isEmail)) errors.email = "Email must be a valid email";
    }

    if (password === "") errors.password = "Password must not be empty";
    else if (password.length < 5)
        errors.password = "Password must be at least 5 characters";

    if (!contact.trim().match(isPhoneNumber))
        errors.contact = "Contact is not a valid phone number";

    if (departmentID.toString().trim() === "")
        errors.departmentID = "Department ID must not be empty";

    if (firstName === "") errors.firstName = "First name should not be empty";

    if (institution === "") errors.institution = "Institution cannot be empty";

    if (profilePhoto === "")
        errors.profilePhoto === "Profile photo cannot be empty";

    if (userType === "STUDENT" && regNo === "")
        errors.regNo = "Registration number is required for students";

    const existingUserWithSameEmail = await prisma.user.findUnique({
        where: {
            email: email,
        },
    });
    if (existingUserWithSameEmail) {
        errors.email = "User with this email is already taken";
    }
    if (userType === "STUDENT") {
        const existingUserWithSameRegNo = await prisma.student.findUnique({
            where: {
                regNo: regNo,
            },
        });
        if (existingUserWithSameRegNo) {
            errors.regNo =
                "Student with this registration number is already registered";
        }
    }
    return {
        errors,
        isValid: Object.values(errors).every((value) => value === null),
    };
};
type PayloadData = {
    id: number;
    email: string;
    userType: "STUDENT" | "FACULTY";
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
