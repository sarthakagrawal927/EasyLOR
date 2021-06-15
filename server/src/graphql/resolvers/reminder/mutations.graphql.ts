import { ApolloContext } from "../../../context";
import { Reminder, MutationResolvers } from "@/types";
import { validateCreateReminderInput, validateUpdateReminderInput, validateDeleteReminder } from "./utils";
import { UserInputError } from "apollo-server";
import { mailer } from "../../../nodemailer/mailer";
import { StudentSelect } from "../student/types";
import { FacultySelect } from "../faculty/types";
import { userSelect } from "../user/userSelect";
import checkAuth from "../../../checkAuth";

export const mutations: MutationResolvers<ApolloContext, Reminder> = {
	async createReminder(_, { createReminderInput }, { prisma, req }: ApolloContext) {
		checkAuth(req);
		const { errors, isValid } = await validateCreateReminderInput({
			...createReminderInput,
		});
		if (!isValid) {
			throw new UserInputError("Errors", { errors });
		}

		const reminder: Reminder & { student: StudentSelect; faculty: FacultySelect } = await prisma.reminder.create({
			data: {
				message: createReminderInput.message,
				studentID: createReminderInput.studentID,
				facultyID: createReminderInput.facultyID,
			},
			include: {
				student: { include: { user: { select: userSelect } } },
				faculty: { include: { user: { select: userSelect } } },
			},
		});

		if (reminder) {
			const htmlContent = `
			<h3>Reminder set by Faculty: ${reminder.faculty?.user.firstName} ${reminder.faculty?.user.lastName} </h3>
			<ul>
				<li><b>Reminder: </b> ${reminder.message}</li>
				<li><b>Faculty Email: </b> ${reminder.faculty?.user.email}</li>
			</ul>
			`;

			const mailOptions = {
				to: reminder.student?.user.email,
				subject: "Reminder for your Application",
				html: htmlContent,
			};

			await mailer(mailOptions);
		}

		return reminder;
	},

	async updateReminder(_, { updateReminderInput }, { prisma, req }: ApolloContext) {
		checkAuth(req);
		const { errors, isValid } = await validateUpdateReminderInput({
			...updateReminderInput,
		});
		if (!isValid) {
			throw new UserInputError("Errors", { errors });
		}

		const reminder: Reminder = await prisma.reminder.update({
			where: {
				id: updateReminderInput.id,
			},
			data: {
				message: updateReminderInput.message ?? undefined,
				viewed: updateReminderInput.viewed ?? undefined,
			},
			include: {
				student: { include: { user: { select: userSelect } } },
				faculty: { include: { user: { select: userSelect } } },
			},
		});

		return reminder;
	},

	async deleteReminder(_, args: { id: string }, { prisma, req }: ApolloContext) {
		checkAuth(req);
		const { errors, isValid } = await validateDeleteReminder(args.id);
		if (!isValid) {
			throw new UserInputError("Errors", { errors });
		}

		const reminder: Reminder = await prisma.reminder.delete({
			where: {
				id: args.id,
			},
			include: {
				student: { include: { user: { select: userSelect } } },
				faculty: { include: { user: { select: userSelect } } },
			},
		});

		return reminder;
	},
};
