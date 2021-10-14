import { Heading } from "@chakra-ui/react";
import NavBar from "components/NavBar/NavBar";
import PendingModal from "./pendingModal";
import GrantedModal from "./grantedModal";
import { useStudentDashboard, makeData } from "./hooks";
import { DashboardContainer, Container } from "../dashboard.styled";
import Table from "../table";
const StudentDashboard = () => {
	const { student, loading, handleClick, pendingIsOpen, pendingOnClose, grantedIsOpen, grantedOnClose, modalData } =
		useStudentDashboard();
	const data = makeData(student);
	const columns = [
		{
			Header: "Application No.",
			accessor: "applicationNo",
		},
		{
			Header: "Faculty",
			accessor: "name",
		},
		{
			Header: "Department",
			accessor: "department",
		},
		{
			Header: "Status",
			accessor: "status",
			Cell: (cell: { value: {}; row: { cells: { value: any }[] } }) => {
				return cell.value === "PENDING" ? (
					<span className="blue" onClick={() => handleClick(cell.row.cells[0].value, "PENDING")}>
						{cell.value}
					</span>
				) : cell.value === "GRANTED" ? (
					<span className="green" onClick={() => handleClick(cell.row.cells[0].value, "GRANTED")}>
						{cell.value}
					</span>
				) : (
					<span className="red">{cell.value}</span>
				);
			},
		},
	];
	return (
		<>
			<NavBar user={student?.user} />
			<DashboardContainer>
				{loading ? (
					<p>Loading...</p>
				) : (
					data &&
					data.length !== 0 && (
						<Container>
							<Heading>Application</Heading>
							<Table columns={columns} data={data} />
						</Container>
					)
				)}
			</DashboardContainer>
			<PendingModal isOpen={pendingIsOpen} onClose={pendingOnClose} modalData={modalData} />
			<GrantedModal isOpen={grantedIsOpen} onClose={grantedOnClose} modalData={modalData} />
		</>
	);
};

export default StudentDashboard;
