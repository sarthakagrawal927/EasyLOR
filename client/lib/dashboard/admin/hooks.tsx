import { useContext, useEffect, useState } from "react";
import { AdminContext, Admin } from "context/admin";
import { GetLorApplicationsQuery, useGetLorApplicationsLazyQuery } from "entities/types.graphql";

type UseAdminDashboardReturn = {
	admin: Admin;
	adminLoading: boolean;
	lorApplicationsLoading: boolean;
	lorApplications: LorApplication[];
};

export type LorApplication = Omit<GetLorApplicationsQuery["getLORApplications"], "__typename">;

export const useAdminDashboard = (): UseAdminDashboardReturn => {
	// TODO: Replace any
	const [lorApplications, setLorApplications] = useState<any>();
	const { admin, loading: adminLoading, fetchAdmin } = useContext(AdminContext);
	const [fetchLorApplications, { loading: lorApplicationsLoading }] = useGetLorApplicationsLazyQuery({
		onCompleted: data => {
			setLorApplications(data.getLORApplications);
		},
	});

	useEffect(() => {
		fetchAdmin();
		fetchLorApplications();
	}, []);

	return {
		admin,
		adminLoading,
		lorApplicationsLoading,
		lorApplications,
	};
};
