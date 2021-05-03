import { ApolloContext, context } from "../../../context";
import { CreateLorApplicationInput, UpdateLorInput } from "@/types";

const { prisma }: ApolloContext = context;

type CreateLORApplicationError = {
	dueDate: string | null;
	statementOfPurpose: string | null;
	course: string | null;
	university: string | null;
	draftURL: string | null;
	studentID: string | null;
	facultyID: string | null;
	lorApplication: string | null;
};

type UpdateLORApplicationError = {
	id: string | null;
	dueDate: string | null;
	statementOfPurpose: string | null;
	course: string | null;
	university: string | null;
	draftURL: string | null;
	empty: string | null;
};

export const validateCreateLORApplicationInput = async ({
	dueDate,
	statementOfPurpose,
	course,
	university,
	studentID,
	facultyID,
}: CreateLorApplicationInput) => {
	const errors: CreateLORApplicationError = {
		dueDate: null,
		statementOfPurpose: null,
		course: null,
		university: null,
		draftURL: null,
		studentID: null,
		facultyID: null,
		lorApplication: null,
	};

	if (dueDate.trim() === "") {
		errors.dueDate = "Due date cannot be empty";
	} else {
		try {
			const date = new Date(dueDate).toISOString();
			if (date !== dueDate) {
				errors.dueDate = "Due date Format not accepted";
			}
		} catch {
			errors.dueDate = "Due date Format not accepted";
		}
	}

	if (statementOfPurpose.trim() === "") errors.statementOfPurpose = "Statement of purpose cannot be empty";

	if (course.trim() === "") errors.course = "Course cannot be empty";

	if (university.trim() === "") errors.university = "University cannot be empty";

	if (studentID.toString().trim() === "") {
		errors.studentID = "Student ID cannot be empty";
	} else {
		const student = await prisma.student.findUnique({
			where: {
				userID: studentID,
			},
		});
		if (!student) errors.studentID = "Student with this ID does not exist";
	}

	if (facultyID.toString().trim() === "") {
		errors.facultyID = "faculty ID cannot be empty";
	} else {
		const faculty = await prisma.faculty.findUnique({
			where: {
				userID: facultyID,
			},
		});
		if (!faculty) errors.facultyID = "faculty with this ID does not exist";
	}

	if (errors.studentID === null && errors.facultyID === null) {
		const existingLORApplication = await prisma.lORApplication.findUnique({
			where: {
				studentID_facultyID: {
					studentID: studentID,
					facultyID: facultyID,
				},
			},
		});
		if (existingLORApplication) errors.lorApplication = "Application already exists";
	}

	return {
		errors: errors,
		isValid: Object.values(errors).every(value => value === null),
	};
};

export const validateUpdateLORApplicationInput = async ({
	id,
	dueDate,
	statementOfPurpose,
	course,
	university,
	draftURL,
	status,
}: UpdateLorInput) => {
	const errors: UpdateLORApplicationError = {
		id: null,
		dueDate: null,
		statementOfPurpose: null,
		course: null,
		university: null,
		draftURL: null,
		empty: null,
	};

	if (id.toString().trim() === "") {
		errors.id = "ID cannot be empty";
	} else {
		const lorApplication = await prisma.lORApplication.findUnique({
			where: {
				id: id,
			},
		});
		if (!lorApplication) errors.id = "Application with this ID does not exist";
	}

	if (dueDate?.trim() === "") {
		errors.dueDate = "Due date cannot be empty";
	} else if (dueDate != null) {
		try {
			const date = new Date(dueDate).toISOString();
			if (date !== dueDate) {
				errors.dueDate = "Due date Format not accepted";
			}
		} catch {
			errors.dueDate = "Due date Format not accepted";
		}
	}

	if (statementOfPurpose?.trim() === "") errors.statementOfPurpose = "Statement of purpose cannot be empty";

	if (course?.trim() === "") errors.course = "Course cannot be empty";

	if (university?.trim() === "") errors.university = "University cannot be empty";

	if (
		dueDate == null &&
		statementOfPurpose == null &&
		course == null &&
		university == null &&
		draftURL == null &&
		status == null
	)
		errors.empty = "Nothing to update";

	return {
		errors: errors,
		isValid: Object.values(errors).every(value => value === null),
	};
};
