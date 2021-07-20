import { UpdateLorApplicationInput, useUpdateLorApplicationMutation } from "../../entities/types.graphql";
import { useRouter } from "next/router";
import { Student, StudentContext } from "context/student";
import { createStandaloneToast } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useState, useContext, useEffect } from "react";

type LorApplication = {
	id: string;
	course: string;
	university: string;
	draftURL: FileList | string;
	statementOfPurpose: string;
	dueDate: string;
};

const getLORApplication = (student: Student, id: string) => {
	let prevApplicationData: LorApplication = {
		id: id,
		course: "",
		university: "",
		draftURL: "",
		statementOfPurpose: "",
		dueDate: "",
	};
	for (let i = 0; i < student?.lorApplications.length; i++) {
		let application = student?.lorApplications[i];
		if (application?.id === id) {
			prevApplicationData.course = application.course;
			prevApplicationData.university = application.university;
			prevApplicationData.statementOfPurpose = application.statementOfPurpose;
			prevApplicationData.draftURL = application.draftURL;
			prevApplicationData.dueDate = application.dueDate;
		}
	}
	return prevApplicationData;
};

const getModalData = (student: Student, id: string) => {
	let modalData = {
		department: "",
		facultyData: {
			name: "",
			profilePhoto: "",
		},
	};
	for (let i = 0; i < student?.lorApplications.length; i++) {
		let application = student?.lorApplications[i];
		if (application?.id === id) {
			modalData.department = application.faculty.user.department.name;
			modalData.facultyData.name = application.faculty.user.firstName + " " + application.faculty.user.lastName;
			modalData.facultyData.profilePhoto = application.faculty.user.profilePhoto;
		}
	}
	return modalData;
};

export const useApplicationForm = (id: string) => {
	const { student, fetchStudent } = useContext(StudentContext);
	useEffect(() => {
		fetchStudent();
	}, []);

	let prevApplicationData = getLORApplication(student, id);
	let remainingModalData = getModalData(student, id);
	const {
		register,
		handleSubmit,
		getValues,
		formState: { errors: formErrors },
	} = useForm<LorApplication>({ defaultValues: prevApplicationData });

	const [dateString, setDateString] = useState(null);

	const makeModalData = () => {
		let facultyInfo = remainingModalData.facultyData;
		let draftURLObject = getValues("draftURL");
		const draftURL = draftURLObject as FileList;
		console.log(draftURLObject);
		let modalData = {
			statementOfPurpose: getValues("statementOfPurpose"),
			facultyName: facultyInfo.name,
			university: getValues("university"),
			department: remainingModalData.department,
			course: getValues("course"),
			profilePic: facultyInfo.profilePhoto,
			draftURL: "",
			dueDate: dateString,
		};
		return modalData;
	};

	const [updateLorMutation] = useUpdateLorApplicationMutation();
	const toast = createStandaloneToast();
	const router = useRouter();

	const onSubmit = handleSubmit(async data => {
		const lorApplicationData: UpdateLorApplicationInput = {
			statementOfPurpose: data.statementOfPurpose,
			course: data.course,
			university: data.university,
			dueDate: dateString,
			draftURL: null,
			id: id,
		};
		try {
			toast({
				description: "Submitting...",
				status: "info",
				duration: 5000,
				isClosable: true,
			});
			const { data: response } = await updateLorMutation({
				variables: {
					updateLORApplicationInput: lorApplicationData,
				},
			});
			toast({
				description: "Success, your LOR application is submitted",
				status: "success",
				duration: 5000,
				isClosable: true,
			});

			console.log(response);
			router.push("/dashboard");
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
		handleSubmit: onSubmit,
		errors: formErrors,
		register,
		makeModalData,
		setDateString,
	};
};
