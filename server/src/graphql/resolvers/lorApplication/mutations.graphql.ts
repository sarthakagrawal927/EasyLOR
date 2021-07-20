import { ApolloContext } from "../../../context";
import { LorApplication, MutationResolvers } from "@/types";
import {
	validateCreateLORApplicationInput,
	validateDeleteLORApplication,
	validateUpdateLORApplicationInput,
} from "./utils";
import { UserInputError } from "apollo-server";
// import { mailer } from "../../../nodemailer/mailer";
import { userSelect } from "../user/userSelect";
import checkAuth from "../../../checkAuth";

export const mutations: MutationResolvers<ApolloContext, LorApplication> = {
	async createLORApplication(_, { createLORApplicationInput }, { prisma, req }: ApolloContext) {
		const user = checkAuth(req);
		if (process.env.NODE_ENV === "production" && createLORApplicationInput.studentID !== user.id) {
			throw new Error("INVALID_ACTION: LOR Application can only be created by authorized user");
		}
		const { errors, isValid } = await validateCreateLORApplicationInput({
			...createLORApplicationInput,
		});
		if (!isValid) {
			throw new UserInputError(Object.values(errors).find(error => error !== null) ?? "", { errors });
		}

		const lorApp: LorApplication = await prisma.lORApplication.create({
			data: {
				dueDate: createLORApplicationInput.dueDate ?? undefined,
				statementOfPurpose: createLORApplicationInput.statementOfPurpose,
				course: createLORApplicationInput.course,
				university: createLORApplicationInput.university,
				draftURL: createLORApplicationInput.draftURL ?? undefined,
				studentID: createLORApplicationInput.studentID,
				facultyID: createLORApplicationInput.facultyID,
			},
			include: {
				student: {
					include: { user: { select: userSelect } },
				},
				faculty: {
					include: { user: { select: userSelect } },
				},
			},
		});

		// if (lorApp) {
		// 	const htmlContent = `
		// 	<h3>Application submitted by ${lorApp.student?.user.firstName} ${lorApp.student?.user.lastName}</h3>
		// 	<ul>
		// 		<li><b>Statement of Purpose:</b> ${lorApp.statementOfPurpose}</li>
		// 		<li><b>University:</b> ${lorApp.university}</li>
		// 		<li><b>Course:</b> ${lorApp.course}</li>
		// 		<li><b>Due Date:</b> ${lorApp.dueDate}</li>
		// 		<li><b>Student contact:</b> ${lorApp.student?.user.email}</li>
		// 	</ul>
		// 	`;

		// 	const mailOptions = {
		// 		to: lorApp.faculty?.user.email,
		// 		subject: `New LOR Application: ${lorApp.student?.regNo}`,
		// 		html: htmlContent,
		// 	};

		// 	await mailer(mailOptions);
		// }

		return lorApp;
	},

	async updateLORApplication(_, { updateLORApplicationInput }, { prisma, req }: ApolloContext) {
		checkAuth(req);
		const { errors, isValid } = await validateUpdateLORApplicationInput({
			...updateLORApplicationInput,
		});
		if (!isValid) {
			throw new UserInputError(Object.values(errors).find(error => error !== null) ?? "", { errors });
		}

		const lorApp: LorApplication = await prisma.lORApplication.update({
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
				rejectionReason: updateLORApplicationInput.rejectionReason ?? undefined,
			},
			include: {
				student: { include: { user: { select: userSelect } } },
				faculty: { include: { user: { select: userSelect } } },
			},
		});

		// if (lorApp) {
		// 	let htmlContent = `
		// 	<h3>Application ${lorApp.status.toUpperCase()}</h3>
		// 	<ul>
		// 	`;

		// 	if (lorApp.status.toUpperCase() === "REJECTED") {
		// 		htmlContent += `
		// 			<li><b>Reason:</b> ${lorApp.rejectionReason}</li>
		// 		`;
		// 	}

		// 	htmlContent += `
		// 		<li><b>Faculty:</b> ${lorApp.faculty?.user.firstName} ${lorApp.faculty?.user.lastName}</li>
		// 		<li><b>Faculty Email:</b> ${lorApp.faculty?.user.email}</li>
		// 	</ul>
		// 	`;

		// 	const mailOptions = {
		// 		to: lorApp.student?.user.email,
		// 		subject: "Application Status updated",
		// 		html: htmlContent,
		// 	};

		// 	await mailer(mailOptions);
		// }

		return lorApp;
	},

	async deleteLORApplication(_, args: { id: string }, { prisma, req }: ApolloContext) {
		checkAuth(req);
		const { errors, isValid } = await validateDeleteLORApplication(args.id);
		if (!isValid) {
			throw new UserInputError(Object.values(errors).find(error => error !== null) ?? "", { errors });
		}

		const lorApp: LorApplication = await prisma.lORApplication.delete({
			where: {
				id: args.id,
			},
			include: {
				student: { include: { user: { select: userSelect } } },
				faculty: { include: { user: { select: userSelect } } },
			},
		});

		return lorApp;
	},
};
