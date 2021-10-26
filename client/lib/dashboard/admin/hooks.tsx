import { useContext, useEffect, useState, useCallback } from "react";
import { AdminContext, Admin } from "context/admin";
import {
	GetLorApplicationsQuery,
	useGetLorApplicationsLazyQuery,
	useGetDepartmentsLazyQuery,
	Department,
} from "entities/types.graphql";

type UseAdminDashboardReturn = {
	admin: Admin;
	adminLoading: boolean;
	lorApplicationsLoading: boolean;
	departmentsLoading: boolean;
	filteredLorApplications: LorApplication[];
	options: Department[];
	filters: Filters;
	setFilters: (value: Filters) => void;
	handleFilterSubmit: () => void;
	handleFilterClear: () => void;
	makeTableData: (value: any) => any;
};

type Filters = {
	studentDepartment: string | null;
	facultyDepartment: string | null;
};

const initialFilterState = {
	studentDepartment: "None",
	facultyDepartment: "None",
};

export type LorApplication = Omit<GetLorApplicationsQuery["getLORApplications"], "__typename">;

const makeTableData = (lorApplications: any) => {
	let data = [];
	for (let i = 0; i < lorApplications?.length; i++) {
		let lorApplication = {
			studentName:
				lorApplications[i]?.student?.user?.firstName + " " + lorApplications[i]?.student?.user?.lastName,
			studentDepartment: lorApplications[i]?.student?.user?.department?.name,
			studentProfilePicture: lorApplications[i]?.student?.user?.profilePhoto,
			studentEmail: lorApplications[i]?.student?.user?.email,
			studentContact: lorApplications[i]?.student?.user?.contact,
			studentTests: "",
			facultyName:
				lorApplications[i]?.faculty?.user?.firstName + " " + lorApplications[i]?.faculty?.user?.lastName,
			facultyDepartment: lorApplications[i]?.faculty?.user?.department?.name,
			facultyProfilePicture: lorApplications[i]?.faculty?.user?.profilePhoto,
			university: lorApplications[i]?.university,
			course: lorApplications[i]?.course,
			lorURL: lorApplications[i]?.lorURL,
		};
		let studentTestScores = "";
		for (let j = 0; j < lorApplications[i]?.student?.testScores?.length; j++) {
			studentTestScores += `${lorApplications[i]?.student?.testScores[j]?.exam} ${lorApplications[i]?.student?.testScores[j]?.score} \n`;
		}
		lorApplication.studentTests = studentTestScores;
		data.push(lorApplication);
	}
	return data;
};

export const useAdminDashboard = (): UseAdminDashboardReturn => {
	// TODO: Replace any
	const [lorApplications, setLorApplications] = useState<any>();
	const [filteredLorApplications, setFilteredLorApplications] = useState<any>();

	const [departments, setDepartments] = useState<Department[]>();
	const [filters, setFilters] = useState<Filters>(initialFilterState);

	const { admin, loading: adminLoading, fetchAdmin } = useContext(AdminContext);

	const [fetchLorApplications, { loading: lorApplicationsLoading }] = useGetLorApplicationsLazyQuery({
		onCompleted: data => {
			setLorApplications(data.getLORApplications);
			setFilteredLorApplications(data.getLORApplications);
		},
	});

	const [fetchDepartments, { loading: departmentsLoading }] = useGetDepartmentsLazyQuery({
		onCompleted: data => {
			setDepartments([{ name: "None", id: "666" }, ...data.getDepartments]);
		},
	});

	useEffect(() => {
		fetchAdmin();
		fetchLorApplications();
		fetchDepartments();
	}, []);

	const handleFilterSubmit = () => {
		const filteredResults = lorApplications
			.filter(lorApplication => {
				if (
					filters.facultyDepartment === "None" ||
					filters.facultyDepartment === lorApplication?.faculty?.user?.department?.name
				) {
					return lorApplication;
				}
			})
			.filter(lorApplication => {
				if (
					filters.studentDepartment === "None" ||
					filters.studentDepartment === lorApplication?.student?.user?.department?.name
				) {
					return lorApplication;
				}
			});
		setFilteredLorApplications(filteredResults);
	};

	const handleFilterClear = () => {
		setFilters(initialFilterState);
		setFilteredLorApplications(lorApplications);
	};

	return {
		admin,
		adminLoading,
		lorApplicationsLoading,
		filteredLorApplications,
		departmentsLoading,
		options: departments,
		filters,
		setFilters,
		handleFilterClear,
		handleFilterSubmit,
		makeTableData,
	};
};
