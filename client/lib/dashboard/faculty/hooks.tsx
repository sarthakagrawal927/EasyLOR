import { useContext, useEffect } from "react";
import { FacultyContext, Faculty } from "context/faculty";
import Link from "next/link";

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
			//change to pending once ready
			let lorApplication = {
				applicationID: lorApplications[i].id,
				department: lorApplications[i].student.user.department.name,
				name: lorApplications[i].student.user.firstName + " " + lorApplications[i].student.user.lastName,
				link: lorApplications[i].id,
			};
			data.push(lorApplication);
		}
	}
	return data;
};

export const columns = [
	{
		Header: "Application ID",
		accessor: "applicationID",
	},
	{
		Header: "Student",
		accessor: "name",
	},
	{
		Header: "Branch",
		accessor: "department",
	},
	{
		Header: "VIEW",
		accessor: "link",
		Cell: (e: any) => (
			<Link href={"/viewApplication/" + e.value}>
				<button>View</button>
			</Link>
		),
	},
];
