import NavBar from "components/NavBar/NavBar";
import { useAdminDashboard } from "./hooks";
import AdminTable from "./table";
import { Flex, Spacer } from "@chakra-ui/react";
import { Container, CountText } from "./adminDashboard.styled";
import FilterLOR from "./filterLOR";
import ExportToCSV from "./exportToCSV";
const AdminDashboard = () => {
	const {
		admin,
		adminLoading,
		lorApplicationsLoading,
		filteredLorApplications,
		departmentsLoading,
		options: options,
		filters,
		setFilters,
		handleFilterClear,
		handleFilterSubmit,
		makeTableData,
	} = useAdminDashboard();
	return (
		<>
			{!adminLoading && <NavBar user={admin} />}
			<Container>
				<Flex>
					<ExportToCSV lorApplications={filteredLorApplications} makeTableData={makeTableData} />
					<Spacer />
					{filteredLorApplications && (
						<CountText>Showing {filteredLorApplications?.length} results</CountText>
					)}
					{!departmentsLoading && (
						<FilterLOR
							options={options}
							handleFilterClear={handleFilterClear}
							handleFilterSubmit={handleFilterSubmit}
							filters={filters}
							setFilters={setFilters}
						/>
					)}
				</Flex>
				{!lorApplicationsLoading && (
					<AdminTable lorApplications={filteredLorApplications} makeTableData={makeTableData} />
				)}
			</Container>
		</>
	);
};

export default AdminDashboard;
