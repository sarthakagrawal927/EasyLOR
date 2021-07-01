import { Heading } from "@chakra-ui/react";
import NavBar from "components/NavBar/NavBar";
import PreviewModal from "./modal";
import { useStudentDashboard, makeData } from "./hooks";
import { DashboardContainer, Container } from "../dashboard.styled";
import Table from "../table";
const StudentDashboard = () => {
	const { student, loading, handleClick, isOpen, onClose, modalData } = useStudentDashboard();
	const data = makeData(student);
	const columns = [
		{
			Header: "Application No.",
			accessor: "applicationNo",
		},
		{
			Header: "Faculty Name",
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
					<span className="blue" onClick={() => handleClick(cell.row.cells[0].value)}>
						{cell.value}
					</span>
				) : cell.value === "ACCEPTED" ? (
					<span className="green">{cell.value}</span>
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
			<PreviewModal isOpen={isOpen} onClose={onClose} modalData={modalData} />
		</>
	);
};

export default StudentDashboard;
