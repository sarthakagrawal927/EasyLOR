import { CreateReminderInput, UpdateReminderInput } from "@/types";
import { ApolloContext, context } from "../../../context";

const { prisma }: ApolloContext = context;

type CreateReminderError = {
	message: string | null;
	studentID: string | null;
	facultyID: string | null;
	reminder: string | null;
};

type UpdateReminderError = {
	id: string | null;
	message: string | null;
	viewed: string | null;
	empty: string | null;
};

type DeleteReminderError = {
	id: string | null;
};

export const validateCreateReminderInput = async ({ message, studentID, facultyID }: CreateReminderInput) => {
	const errors: CreateReminderError = {
		message: null,
		studentID: null,
		facultyID: null,
		reminder: null,
	};

	if (message.trim() === "") errors.message = "Message cannot be empty";

	if (studentID.toString().trim() === "") {
		errors.studentID = "Student ID should not be empty";
	} else {
		const student = await prisma.student.findUnique({
			where: {
				userID: studentID,
			},
		});
		if (!student) errors.studentID = "Student with this ID does not exist";
	}

	if (facultyID.toString().trim() === "") {
		errors.facultyID = "Faculty ID should not be empty";
	} else {
		const faculty = await prisma.faculty.findUnique({
			where: {
				userID: facultyID,
			},
		});
		if (!faculty) errors.facultyID = "Faculty with this ID does not exist";
	}

	if (errors.studentID === null && errors.facultyID === null) {
		const existingReminder = await prisma.reminder.findUnique({
			where: {
				studentID_facultyID: {
					studentID: studentID,
					facultyID: facultyID,
				},
			},
		});
		if (existingReminder) errors.reminder = "Reminder already exists";
	}

	return {
		errors: errors,
		isValid: Object.values(errors).every(value => value === null),
	};
};

export const validateUpdateReminderInput = async ({ id, message, viewed }: UpdateReminderInput) => {
	const errors: UpdateReminderError = {
		id: null,
		message: null,
		viewed: null,
		empty: null,
	};

	if (id.toString().trim() === "") {
		errors.id = "ID cannot be empty";
	} else {
		const reminder = await prisma.reminder.findUnique({
			where: {
				id: id,
			},
		});
		if (!reminder) errors.id = "Reminder with this ID does not exist";
	}

	if (message?.trim() === "") errors.message = "Message cannot be empty";

	if (viewed != null && viewed !== true && viewed !== false) {
		errors.viewed = "Viewed is not among accepted types";
	}

	if (message == null && viewed == null) errors.empty = "Nothing to update";

	return {
		errors: errors,
		isValid: Object.values(errors).every(value => value === null),
	};
};

export const validateDeleteReminder = async (id: number) => {
	const errors: DeleteReminderError = {
		id: null,
	};
	if (id.toString().trim() === "") {
		errors.id = "ID cannot be empty";
	} else {
		const reminder = await prisma.reminder.findUnique({
			where: {
				id: id,
			},
		});
		if (!reminder) errors.id = "Reminder with this ID does not exist";
	}

	return {
		errors: errors,
		isValid: Object.values(errors).every(value => value === null),
	};
};
