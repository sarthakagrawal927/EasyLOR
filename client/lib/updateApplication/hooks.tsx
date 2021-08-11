import { UpdateLorApplicationInput, useUpdateLorApplicationMutation } from "../../entities/types.graphql";
import { useRouter } from "next/router";
import { Student, StudentContext } from "context/student";
import { createStandaloneToast } from "@chakra-ui/react";
import { useForm, useWatch } from "react-hook-form";
import { useState, useContext, useEffect } from "react";
import axios from "axios";

type LorApplication = {
	id: string;
	course: string;
	university: string;
	draftURL: FileList;
	statementOfPurpose: string;
	dueDate: string;
};

const fileUpload = async (file: File) => {
	const url = "/api/upload";
	const formData = new FormData();
	formData.append("file", file, `studentCreateApplication/${Date.now()}-${file.name}`);
	const config = {
		headers: {
			"content-type": file.type,
		},
	};
	const res = await axios.post(url, formData, config);
	console.log("FILE UPLOAD SUCCESSFUL: ", res.data);
	return res.data;
};

const getNameFromURL = (fileURL: string) => {
	return fileURL ? fileURL.split("/")[4].split("-")[1].replaceAll("%20", " ") : null;
};

const getLORApplication = (student: Student, id: string) => {
	let prevApplicationData: LorApplication = {
		id: id,
		course: "",
		university: "",
		draftURL: null,
		statementOfPurpose: "",
		dueDate: "",
	};
	for (let i = 0; i < student?.lorApplications.length; i++) {
		let application = student?.lorApplications[i];
		if (application?.id === id) {
			prevApplicationData.course = application.course;
			prevApplicationData.university = application.university;
			prevApplicationData.statementOfPurpose = application.statementOfPurpose;
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
		draftURL: "",
	};
	for (let i = 0; i < student?.lorApplications.length; i++) {
		let application = student?.lorApplications[i];
		if (application?.id === id) {
			modalData.department = application.faculty.user.department.name;
			modalData.facultyData.name = application.faculty.user.firstName + " " + application.faculty.user.lastName;
			modalData.facultyData.profilePhoto = application.faculty.user.profilePhoto;
			modalData.draftURL = application.draftURL;
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
		setValue,
		control,
	} = useForm<LorApplication>({ defaultValues: prevApplicationData });

	const deleteFile = () => {
		setValue("draftURL", null);
		setDraftURL(null);
		setDraftName(null);
	};

	const [draftURL, setDraftURL] = useState(remainingModalData?.draftURL);
	const [draftName, setDraftName] = useState(getNameFromURL(draftURL));
	let files = useWatch({ control, name: "draftURL" });

	const [dateString, setDateString] = useState(prevApplicationData?.dueDate);

	const makeModalData = () => {
		let facultyInfo = remainingModalData.facultyData;
		let draftURL = files ? files[0]?.name : null;
		let modalData = {
			statementOfPurpose: getValues("statementOfPurpose"),
			facultyName: facultyInfo.name,
			university: getValues("university"),
			department: remainingModalData.department,
			course: getValues("course"),
			profilePic: facultyInfo.profilePhoto,
			draftURL: draftURL || draftName,
			dueDate: dateString,
		};
		return modalData;
	};

	const [updateLorMutation] = useUpdateLorApplicationMutation();
	const toast = createStandaloneToast();
	const router = useRouter();

	const onSubmit = handleSubmit(async data => {
		let fileURL: string = null;
		if (data.draftURL && data.draftURL[0]) {
			console.log(data.draftURL[0]);
			fileURL = await fileUpload(data.draftURL[0]);
		}

		const lorApplicationData: UpdateLorApplicationInput = {
			statementOfPurpose: data.statementOfPurpose,
			course: data.course,
			university: data.university,
			dueDate: dateString,
			draftURL: fileURL || draftURL,
			id: id,
		};
		console.log(lorApplicationData);
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
		student,
		draftName,
		deleteFile,
		files,
	};
};
