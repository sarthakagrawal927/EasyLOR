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
import { useForm } from "react-hook-form";
import { useState, useContext } from "react";

export const useApplicationForm = () => {
	const {
		register,
		handleSubmit,
		getValues,
		formState: { errors: formErrors },
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

	const updateFaculty = () => {
		const branchFaculties = facultiesData.getFaculties.filter(
			(faculty: Faculty) => faculty.user.department.name === getValues("department")
		);
		setFaculties(branchFaculties);
	};

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

	const [createLorMutation] = useCreateLorApplicationMutation();
	const toast = createStandaloneToast();
	const router = useRouter();

	const onSubmit = handleSubmit(async data => {
		const lorApplicationData: CreateLorApplicationInput = {
			statementOfPurpose: data.statementOfPurpose,
			course: data.course,
			university: data.statementOfPurpose,
			facultyID: data.facultyID,
			studentID: user.id,
			dueDate: dateString,
			draftURL: data.draftURL[0]?.name,
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
	};
};
