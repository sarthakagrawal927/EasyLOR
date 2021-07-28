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
let serialToApplicationMap = new Map();
export const makeData = (faculty: Faculty) => {
	let data = [];
	let lorApplications = faculty?.lorApplications;
	for (let i = 0; i < lorApplications?.length; i++) {
		if (lorApplications[i].status === "PENDING") {
			//change to pending once ready
			let lorApplication = {
				applicationNo: i + 1,
				department: lorApplications[i].student.user.department.name,
				name: lorApplications[i].student.user.firstName + " " + lorApplications[i].student.user.lastName,
				link: lorApplications[i].id,
			};
			data.push(lorApplication);
			serialToApplicationMap[i + 1] = lorApplications[i];
		}
	}
	return data;
};
