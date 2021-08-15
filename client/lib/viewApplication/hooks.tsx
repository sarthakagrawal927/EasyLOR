import {
	User,
	Student,
	LorApplication,
	UpdateLorApplicationInput,
	useUpdateLorApplicationMutation,
	Status,
} from "../../entities/types.graphql";
import { useContext, useEffect } from "react";
import { FacultyContext } from "context/faculty";
import { createStandaloneToast } from "@chakra-ui/react";

type ViewApplicationReturn = {
	user: User;
	student: Student;
	application: Omit<LorApplication, "faculty">;
	getRejectionReason: (reason: string | null) => void;
};

export const useViewApplication = (id: string): ViewApplicationReturn => {
	const { faculty, fetchFaculty } = useContext(FacultyContext);
	const toast = createStandaloneToast();

	const student: Student = faculty?.lorApplications.find(application => application.id == id)?.student;
	const lorApplication = faculty?.lorApplications.find(application => application.id == id);
	useEffect(() => {
		fetchFaculty();
	}, []);

	const [updateLorApplicationMutation] = useUpdateLorApplicationMutation({
		onCompleted: data => {
			toast({
				title: "SUCCESS",
				description: "Application Rejected",
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

	const getRejectionReason = async (reason: string | null) => {
		const updateLORApplicationData: UpdateLorApplicationInput = {
			id: id,
			status: Status.Rejected,
			rejectionReason: reason,
		};

		const { data } = await updateLorApplicationMutation({
			variables: {
				updateLORApplicationInput: updateLORApplicationData,
			},
		});
	};

	return {
		user: faculty?.user,
		student,
		application: lorApplication,
		getRejectionReason,
	};
};
