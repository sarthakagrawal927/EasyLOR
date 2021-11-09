import { CSVLink } from "react-csv";
import { ExportButton } from "../dashboard.styled";
import ExcelIcon from "components/icons/ExcelIcon";

const ExportToCSV = ({ lorApplications, makeTableData }) => {
	const downloadableData = makeTableData(lorApplications);
	const headers = [
		{ label: "Student Name", key: "studentName" },
		{ label: "Student Department", key: "studentDepartment" },
		{ label: "Student Email", key: "studentEmail" },
		{ label: "Student Contact", key: "studentContact" },
		{ label: "Faculty Name", key: "facultyName" },
		{ label: "Faculty Department", key: "facultyDepartment" },
		{ label: "University", key: "university" },
		{ label: "Course", key: "course" },
		{ label: "Letter of Recommendation URL", key: "lorURL" },
		{ label: "Accepted University", key: "acceptedUniversity" },
		{ label: "Proof Of Acceptance", key: "proofOfAcceptance" },
		{ label: "Student Test 1", key: "studentTest1" },
		{ label: "Student Test 1 Proof", key: "studentTest1Proof" },
		{ label: "Student Test 2", key: "studentTest2" },
		{ label: "Student Test 2 Proof", key: "studentTest2Proof" },
		{ label: "Student Test 3", key: "studentTest3" },
		{ label: "Student Test 3 Proof", key: "studentTest3Proof" },
	];
	return (
		<>
			{downloadableData.length !== 0 && (
				<CSVLink data={downloadableData} headers={headers} target="_blank" filename="LOR_Applications.csv">
					<ExportButton leftIcon={<ExcelIcon />} aria-label="filter" border="none" boxShadow="none">
						Export to CSV
					</ExportButton>
				</CSVLink>
			)}
		</>
	);
};

export default ExportToCSV;
