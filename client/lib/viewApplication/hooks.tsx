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
import { useForm, useWatch, Controller } from "react-hook-form";
import uploadFile from "aws/uploadFile";
import FileUpload from "components/FileUpload/FileUpload";

type ViewApplicationReturn = {
	user: User;
	student: Student;
	application: Omit<LorApplication, "faculty">;
	files: any;
	register: any;
	getRejectionReason: (reason: string | null) => void;
	handleSubmit: any;
};

export const useViewApplication = (id: string): ViewApplicationReturn => {
	const { faculty, fetchFaculty } = useContext(FacultyContext);
	const toast = createStandaloneToast();
	const { register, handleSubmit, control } = useForm();
	let files = useWatch({ control, name: "lorURL" });

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

	const onSubmit = handleSubmit(async data => {
		const lorURL = await uploadFile(files[0], "facultyReturnLOR");
		const updateLORApplicationData: UpdateLorApplicationInput = {
			id: id,
			lorURL: lorURL,
			status: Status.Granted,
		};
		try {
			toast({
				description: "Submitting...",
				status: "info",
				duration: 5000,
				isClosable: true,
			});
			const { data: response } = await updateLorApplicationMutation({
				variables: {
					updateLORApplicationInput: updateLORApplicationData,
				},
			});
			toast({
				description: "Success, your LOR is submitted",
				status: "success",
				duration: 5000,
				isClosable: true,
			});
		} catch (err) {
			toast({
				title: "Failed to Submit",
				description: err.message,
				status: "error",
				duration: 9000,
				isClosable: true,
			});
		}
	});

	return {
		user: faculty?.user,
		student,
		application: lorApplication,
		register,
		files,
		getRejectionReason,
		handleSubmit: onSubmit,
	};
};
