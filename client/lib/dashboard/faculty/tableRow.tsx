import { Tr, Td } from "@chakra-ui/react";
import ProfileCell from "../profileCell";

const FacultyTableRow = ({ lor, index }) => {
	const getRowColor = (index: number) => {
		return index % 2 === 0 ? "inherit" : "rgba(244, 244, 244, 0.562)";
	};
	return (
		<Tr backgroundColor={getRowColor(index)}>
			<ProfileCell
				name={lor?.studentName}
				department={lor?.studentDepartment}
				profilePicture={lor?.studentProfilePicture}
			/>
			<Td>
				<p>{lor?.university}</p>
			</Td>
			<Td>
				<p>{lor?.course}</p>
			</Td>

			<Td>
				<a href={`viewApplication/${lor?.id}`}>View</a>
			</Td>
		</Tr>
	);
};

export default FacultyTableRow;
