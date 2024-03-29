import { Tr, Td } from "@chakra-ui/react";
import ProfileCell from "../profileCell";
const AdminTableRow = ({ lor, index }) => {
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
			<Td style={{ whiteSpace: "pre-wrap" }}>
				{" "}
				<a href={lor?.studentTest1Proof}>{lor?.studentTest1}</a>
				{"  "}
				<a href={lor?.studentTest2Proof}>{lor?.studentTest2}</a>
				{"  "}
				<a href={lor?.studentTest3Proof}>{lor?.studentTest3}</a>
			</Td>
			<Td>
				<div> {lor?.studentEmail}</div>
				{lor?.studentContact}
			</Td>
			<Td>
				<a href={lor?.lorURL}>Download</a>
			</Td>
		</Tr>
	);
};

export default AdminTableRow;
