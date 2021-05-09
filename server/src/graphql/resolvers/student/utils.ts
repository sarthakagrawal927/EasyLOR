import { TestScore, UpdateStudentInput } from "@/types";
import { ApolloContext, context } from "../../../context";

const { prisma }: ApolloContext = context;

type UpdateStudentError = {
	id: string | null;
	appliedUniversities: string | null;
	acceptedUniversity: string | null;
	testScores: string | null;
	empty: string | null;
};

export const validateUpdateStudentInput = async ({
	id,
	appliedUniversities,
	acceptedUniversity,
	testScores,
}: UpdateStudentInput) => {
	const errors: UpdateStudentError = {
		id: null,
		appliedUniversities: null,
		acceptedUniversity: null,
		testScores: null,
		empty: null,
	};

	const isNumber: RegExp = /^[0-9]+$/;

	if (id.trim() === "") {
		errors.id = "ID cannot be empty";
	} else {
		const student = await prisma.student.findUnique({
			where: {
				userID: id,
			},
		});
		if (!student) errors.id = "Student with this ID does not exist";
	}

	if (appliedUniversities != null && appliedUniversities.length === 0) {
		errors.appliedUniversities = "Applied Universities array is empty";
	} else {
		appliedUniversities?.forEach(university => {
			if (university.trim() === "") errors.appliedUniversities = "Empty String found in Applied Universities";
		});
	}

	if (acceptedUniversity?.trim() === "") errors.acceptedUniversity = "Accepted University cannot be empty";

	if (testScores != null && testScores?.length === 0) {
		errors.testScores = "Test Scores array is empty";
	} else {
		for (const testScore of testScores ?? []) {
			if (testScore.exam.trim() === "") errors.testScores = "Exam cannot be empty";
			else if (testScore.score.trim() === "") errors.testScores = "Score cannot be empty";
			else if (!testScore.score.match(isNumber)) errors.testScores = "Score must be a number";
			else {
				const existingTestScore: TestScore | null = await prisma.testScore.findUnique({
					where: {
						exam_studentID: {
							exam: testScore.exam,
							studentID: id,
						},
					},
				});
				if (existingTestScore) errors.testScores = "Score for this test already exists";
			}
		}
	}

	if (appliedUniversities == null && acceptedUniversity == null && testScores == null)
		errors.empty = "Nothing to update";

	return {
		errors: errors,
		isValid: Object.values(errors).every(value => value === null),
	};
};
