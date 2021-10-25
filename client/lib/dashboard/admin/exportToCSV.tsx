import { CSVLink } from "react-csv";
import { ExportButton } from "../dashboard.styled";
import ExcelIcon from "components/icons/ExcelIcon";

const ExportToCSV = ({ lorApplications, makeTableData }) => {
	const downloadableData = makeTableData(lorApplications);
	return (
		<>
			{downloadableData.length !== 0 && (
				<CSVLink data={downloadableData} target="_blank" filename="LOR_Applications.csv">
					<ExportButton leftIcon={<ExcelIcon />} aria-label="filter" border="none" boxShadow="none">
						Export to CSV
					</ExportButton>
				</CSVLink>
			)}
		</>
	);
};

export default ExportToCSV;
