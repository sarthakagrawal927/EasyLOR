import {
	User,
	Student,
	useGetPastApplicationsByFacultyIdQuery,
	useCreateReminderMutation,
	CreateReminderInput,
} from "entities/types.graphql";
import { useContext, useEffect } from "react";
import { createStandaloneToast } from "@chakra-ui/react";
import { FacultyContext } from "context/faculty";

type StudentWithoutLORApplication = Omit<Student, "lorApplications">;

type getReminderProps = {
	student: Student;
	facultyUser: User;
	message: string;
};

type PastApplicationsReturn = {
	user: User;
	data: StudentWithoutLORApplication[] | null;
	loading: boolean;
	getReminder: ({}: getReminderProps) => void;
};

export const usePastApplications = (): PastApplicationsReturn => {
	const toast = createStandaloneToast();

	const { faculty, fetchFaculty } = useContext(FacultyContext);

	useEffect(() => {
		fetchFaculty();
	}, []);

	const { data, loading, error } = useGetPastApplicationsByFacultyIdQuery({
		variables: {
			id: faculty?.user.id,
		},
		onError: error => {
			toast({
				title: "FAILED",
				description: error.message,
				status: "error",
				duration: 3000,
				position: "top",
				isClosable: true,
			});
		},
	});

	const [createReminderMutation] = useCreateReminderMutation({
		onCompleted: data => {
			toast({
				title: "SUCCESS",
				description: "Reminder Sent",
				status: "success",
				duration: 3000,
				position: "top",
				isClosable: true,
			});
		},
		onError: error => {
			toast({
				title: "FAILED",
				description: error.message,
				status: "error",
				duration: 3000,
				position: "top",
				isClosable: true,
			});
		},
	});

	const getReminder = async ({ student, facultyUser, message }: getReminderProps) => {
		const createReminderData: CreateReminderInput = {
			studentID: student.user.id,
			facultyID: facultyUser.id,
			message: message,
		};

		const { data } = await createReminderMutation({
			variables: {
				createReminderInput: createReminderData,
			},
		});
	};

	return {
		user: faculty?.user,
		data: data?.getPastApplicationsByFacultyID,
		loading,
		getReminder,
	};
};
