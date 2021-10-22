import { Tr, Td } from "@chakra-ui/react";
import ProfileCell from "./profileCell";
const AdminTableRow = ({ lor, index }) => {
	const getRowColor = (index: number) => {
		return index % 2 === 0 ? "inherit" : "rgba(244, 244, 244, 0.562)";
	};
	const studentName = lor?.student?.user?.firstName + " " + lor?.student?.user?.lastName;
	const studentDepartment = lor?.student?.user?.department?.name;
	const studentProfilePicture = lor?.student?.user?.profilePhoto;
	const studentEmail = lor?.student?.user?.email;
	const studentContact = lor?.student?.user?.contact;
	const studentTests = lor?.student?.testScores;

	const facultyName = lor?.faculty?.user?.firstName + " " + lor?.faculty?.user?.lastName;
	const facultyDepartment = lor?.faculty?.user?.department?.name;
	const facultyProfilePicture = lor?.faculty?.user?.profilePhoto;
	return (
		<Tr backgroundColor={getRowColor(index)}>
			<ProfileCell name={studentName} department={studentDepartment} profilePicture={studentProfilePicture} />
			<ProfileCell name={facultyName} department={facultyDepartment} profilePicture={facultyProfilePicture} />
			<Td>
				<p>{lor?.university}</p>
			</Td>
			<Td>
				<p>{lor?.course}</p>
			</Td>
			<Td>
				{studentTests.map(studentTest => {
					return <div>{`${studentTest.exam} ${studentTest.score}`}</div>;
				})}
			</Td>
			<Td>
				<div> {studentEmail}</div>
				{studentContact}
			</Td>
			<Td>
				<a href={lor?.lorURL}>Download</a>
			</Td>
		</Tr>
	);
};

export default AdminTableRow;
