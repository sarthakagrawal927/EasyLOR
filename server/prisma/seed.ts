import { PrismaClient, Prisma } from "@prisma/client";
import { departments, users, lorAppliations } from "./seedData";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function seed() {
	await prisma.lORApplication.deleteMany();
	await prisma.student.deleteMany();
	await prisma.faculty.deleteMany();
	await prisma.user.deleteMany();
	await prisma.department.deleteMany();

	for (const department of departments) {
		await prisma.department.create({
			data: {
				name: department.name,
			},
		});
	}

	for (const user of users) {
		const password = await bcrypt.hash(user.password, 12);

		let newUser: Prisma.UserCreateInput = {
			firstName: user.firstName,
			lastName: user.lastName ?? "",
			email: user.email,
			contact: user.contact,
			department: {
				connect: {
					name: user.departmentName,
				},
			},
			institution: user.institution,
			password: password,
			profilePhoto: user.profilePhoto,
			userType: user.userType,
		};

		if (newUser.userType === "STUDENT") {
			newUser = {
				...newUser,
				student: {
					create: {
						regNo: user.regNo ?? "",
					},
				},
			};
		}

		if (newUser.userType === "FACULTY") {
			newUser = {
				...newUser,
				faculty: {
					create: {
						lorDraftTemplate: "",
					},
				},
			};
		}

		await prisma.user.create({
			data: newUser,
		});
	}

	for (const application of lorAppliations) {
		const faculty = await prisma.user.findUnique({
			where: {
				email: application.facultyEmail,
			},
		});
		const student = await prisma.user.findUnique({
			where: {
				email: application.studentEmail,
			},
		});

		await prisma.lORApplication.create({
			data: {
				dueDate: application.dueDate ?? undefined,
				statementOfPurpose: application.statementOfPurpose,
				course: application.course,
				university: application.university,
				draftURL: application.draftURL ?? undefined,
				status: application.status,
				rejectionReason: application.rejectionReason ?? undefined,
				facultyID: faculty?.id ?? "",
				studentID: student?.id ?? "",
			},
		});
	}
}

seed()
	.catch(err => {
		console.log(err);
	})
	.finally(() => {
		prisma.$disconnect();
	});
