import { useContext, useEffect } from "react";
import { FacultyContext, Faculty } from "context/faculty";

type UseFacultyDashboardReturn = {
	faculty: Faculty;
	loading: boolean;
};
export const useFacultyDashboard = (): UseFacultyDashboardReturn => {
	const { faculty, loading, fetchFaculty } = useContext(FacultyContext);

	useEffect(() => {
		fetchFaculty();
	}, []);

	return {
		faculty,
		loading,
	};
};
export const makeData = (faculty: Faculty) => {
	let data = [];
	let lorApplications = faculty?.lorApplications;
	for (let i = 0; i < lorApplications?.length; i++) {
		if (lorApplications[i].status === "PENDING") {
			let lorApplication = {
				id: lorApplications[i].id,
				studentDepartment: lorApplications[i].student.user.department.name,
				studentProfilePicture: lorApplications[i].student.user.profilePhoto,
				university: lorApplications[i].university,
				course: lorApplications[i].course,
				studentName: lorApplications[i].student.user.firstName + " " + lorApplications[i].student.user.lastName,
			};
			data.push(lorApplication);
		}
	}
	return data;
};
