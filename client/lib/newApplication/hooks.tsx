import {
	useGetFacultiesQuery,
	useGetDepartmentsQuery,
	CreateLorApplicationInput,
	useCreateLorApplicationMutation,
	Faculty,
} from "../../entities/types.graphql";
import { useRouter } from "next/router";

import { createStandaloneToast } from "@chakra-ui/react";
import { AuthContext } from "context/auth";
import { useForm, useWatch } from "react-hook-form";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Student, StudentContext } from "context/student";

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

export const useApplicationForm = () => {
	const { student, loading, fetchStudent } = useContext(StudentContext);
	useEffect(() => {
		fetchStudent();
	}, []);

	const {
		register,
		handleSubmit,
		getValues,
		control,
		formState: { errors: formErrors },
		setValue,
	} = useForm();

	const { user } = useContext(AuthContext);

	const getFacultyData = () => {
		const { data } = useGetFacultiesQuery();
		return data;
	};

	const getDepartmentData = () => {
		const { data: departments } = useGetDepartmentsQuery();
		return departments?.getDepartments;
	};

	const [faculties, setFaculties] = useState([]);
	const [dateString, setDateString] = useState(null);
	const facultiesData = getFacultyData();

	const departments = getDepartmentData();

	const updateFaculty = (e: { preventDefault: () => void }) => {
		e.preventDefault();
		const branchFaculties = facultiesData.getFaculties.filter(
			(faculty: Faculty) => faculty.user.department.name === getValues("department")
		);
		setFaculties(branchFaculties);
	};

	let files = useWatch({ control, name: "draftURL" });

	const getFacultyInfo = (id: string) => {
		let selectedFaculty = facultiesData.getFaculties.filter(faculty => {
			return faculty.user.id === id;
		});

		let facultyInfo = {
			facultyName: selectedFaculty[0].user.firstName + " " + selectedFaculty[0].user.lastName,
			facultyPhoto: selectedFaculty[0].user.profilePhoto,
		};

		return facultyInfo;
	};
	const makeModalData = () => {
		let facultyInfo = getValues("facultyID") ? getFacultyInfo(getValues("facultyID")) : null;
		let draftURLObject = getValues("draftURL");
		let draftURL = draftURLObject ? draftURLObject[0]?.name : null;
		let modalData = {
			statementOfPurpose: getValues("statementOfPurpose"),
			facultyName: facultyInfo ? facultyInfo.facultyName : null,
			university: getValues("university"),
			department: getValues("department"),
			course: getValues("course"),
			profilePic: facultyInfo ? facultyInfo.facultyPhoto : null,
			draftURL: draftURL,
			dueDate: dateString,
		};
		return modalData;
	};

	const deleteFile = () => {
		setValue("draftURL", null);
	};

	const [createLorMutation] = useCreateLorApplicationMutation();
	const toast = createStandaloneToast();
	const router = useRouter();

	const onSubmit = handleSubmit(async data => {
		let fileURL: string = null;
		if (data.draftURL && data.draftURL[0]) {
			fileURL = await fileUpload(data.draftURL[0]);
		}

		const lorApplicationData: CreateLorApplicationInput = {
			statementOfPurpose: data.statementOfPurpose,
			course: data.course,
			university: data.university,
			facultyID: data.facultyID,
			studentID: user.id,
			dueDate: dateString,
			draftURL: fileURL,
		};
		try {
			toast({
				description: "Submitting...",
				status: "info",
				duration: 5000,
				isClosable: true,
			});
			const { data: response } = await createLorMutation({
				variables: {
					createLORApplicationInput: lorApplicationData,
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
		departments,
		faculties,
		updateFaculty,
		getFacultyInfo,
		makeModalData,
		setDateString,
		files,
		deleteFile,
		student,
	};
};
