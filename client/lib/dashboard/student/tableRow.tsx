import { Tr, Td } from "@chakra-ui/react";
import ProfileCell from "../profileCell";
const StudentTableRow = ({ lor, index, handleStatusClick }) => {
	const getRowColor = (index: number) => {
		return index % 2 === 0 ? "inherit" : "rgba(244, 244, 244, 0.562)";
	};
	return (
		<Tr backgroundColor={getRowColor(index)}>
			<ProfileCell
				name={lor?.facultyName}
				department={lor?.facultyDepartment}
				profilePicture={lor?.facultyProfilePicture}
			/>
			<Td>
				<p>{lor?.university}</p>
			</Td>
			<Td>
				<p>{lor?.course}</p>
			</Td>

			<Td>
				{lor?.status === "PENDING" ? (
					<span className="blue" onClick={() => handleStatusClick(lor?.id, "PENDING")}>
						{lor?.status}
					</span>
				) : lor?.status === "GRANTED" ? (
					<span className="green" onClick={() => handleStatusClick(lor?.id, "GRANTED")}>
						{lor?.status}
					</span>
				) : (
					<span className="red">{lor?.status}</span>
				)}
			</Td>
		</Tr>
	);
};

export default StudentTableRow;
