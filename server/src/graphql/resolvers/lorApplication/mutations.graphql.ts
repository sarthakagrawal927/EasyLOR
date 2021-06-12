import { ApolloContext } from "../../../context";
import { LorApplication, MutationResolvers } from "@/types";
import {
	validateCreateLORApplicationInput,
	validateDeleteLORApplication,
	validateUpdateLORApplicationInput,
} from "./utils";
import { StudentSelect } from "../student/types";
import { FacultySelect } from "../faculty/types";
import { UserInputError } from "apollo-server";
import { mailer } from "../../../nodemailer/mailer";

export const mutations: MutationResolvers<ApolloContext, LorApplication> = {
	async createLORApplication(_, { createLORApplicationInput }, { prisma }: ApolloContext) {
		const { errors, isValid } = await validateCreateLORApplicationInput({
			...createLORApplicationInput,
		});
		if (!isValid) {
			throw new UserInputError("Errors", { errors });
		}

		const lorApp: LorApplication & {
			student: StudentSelect;
			faculty: FacultySelect;
		} = await prisma.lORApplication.create({
			data: {
				dueDate: createLORApplicationInput.dueDate,
				statementOfPurpose: createLORApplicationInput.statementOfPurpose,
				course: createLORApplicationInput.course,
				university: createLORApplicationInput.university,
				draftURL: createLORApplicationInput.draftURL ?? undefined,
				studentID: createLORApplicationInput.studentID,
				facultyID: createLORApplicationInput.facultyID,
			},
			include: {
				student: {
					include: { user: { include: { department: true } } },
				},
				faculty: {
					include: { user: { include: { department: true } } },
				},
			},
		});

		if (lorApp) {
			const htmlContent = `
			<h3>Application submitted by ${lorApp.student?.user.firstName} ${lorApp.student?.user.lastName}</h3>
			<ul>
				<li><b>Statement of Purpose:</b> ${lorApp.statementOfPurpose}</li>
				<li><b>University:</b> ${lorApp.university}</li>
				<li><b>Course:</b> ${lorApp.course}</li>
				<li><b>Due Date:</b> ${lorApp.dueDate}</li>
				<li><b>Student contact:</b> ${lorApp.student?.user.email}</li>
			</ul>
			`;

			const mailOptions = {
				to: lorApp.faculty?.user.email,
				subject: `New LOR Application: ${lorApp.student?.regNo}`,
				html: htmlContent,
			};

			await mailer(mailOptions);
		}

		return lorApp;
	},

	async updateLORApplication(_, { updateLORApplicationInput }, { prisma }: ApolloContext) {
		const { errors, isValid } = await validateUpdateLORApplicationInput({
			...updateLORApplicationInput,
		});
		if (!isValid) {
			throw new UserInputError("Errors", { errors });
		}

		const lorApp: LorApplication & {
			student: StudentSelect;
			faculty: FacultySelect;
		} = await prisma.lORApplication.update({
			where: {
				id: updateLORApplicationInput.id,
			},
			data: {
				dueDate: updateLORApplicationInput.dueDate ?? undefined,
				statementOfPurpose: updateLORApplicationInput.statementOfPurpose ?? undefined,
				course: updateLORApplicationInput.course ?? undefined,
				university: updateLORApplicationInput.university ?? undefined,
				draftURL: updateLORApplicationInput.draftURL ?? undefined,
				status: updateLORApplicationInput.status ?? undefined,
			},
			include: {
				student: {
					include: { user: { include: { department: true } } },
				},
				faculty: {
					include: { user: { include: { department: true } } },
				},
			},
		});

		if (lorApp) {
			let htmlContent = `
			<h3>Application ${lorApp.status.toUpperCase()}</h3>
			<ul>
			`;

			if (lorApp.status.toUpperCase() === "REJECTED") {
				htmlContent += `
					<li><b>Reason:</b> Reason to be added later -> under dev</li>
				`;
			}

			htmlContent += `
				<li><b>Faculty:</b> ${lorApp.faculty?.user.firstName} ${lorApp.faculty?.user.lastName}</li>
				<li><b>Faculty Email:</b> ${lorApp.faculty?.user.email}</li>
			</ul>
			`;

			const mailOptions = {
				to: lorApp.student?.user.email,
				subject: "Application Status updated",
				html: htmlContent,
			};

			await mailer(mailOptions);
		}

		return lorApp;
	},

	async deleteLORApplication(_, args: { id: string }, { prisma }: ApolloContext) {
		const { errors, isValid } = await validateDeleteLORApplication(args.id);
		if (!isValid) {
			throw new UserInputError("Errors", { errors });
		}

		const lorApp: LorApplication = await prisma.lORApplication.delete({
			where: {
				id: args.id,
			},
		});

		return lorApp;
	},
};
