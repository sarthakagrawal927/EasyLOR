import { Heading } from "@chakra-ui/react";
import NavBar from "components/NavBar/NavBar";
import PendingModal from "./pendingModal";
import GrantedModal from "./grantedModal";
import { useStudentDashboard, makeData } from "./hooks";
import { SmallTableContainer } from "../dashboard.styled";
import StudentTable from "./table";
const StudentDashboard = () => {
	const { student, loading, handleClick, pendingIsOpen, pendingOnClose, grantedIsOpen, grantedOnClose, modalData } =
		useStudentDashboard();
	const lorApplications = makeData(student);
	return (
		<>
			<NavBar user={student?.user} />
			{loading ? (
				<p>Loading...</p>
			) : (
				lorApplications &&
				lorApplications.length !== 0 && (
					<SmallTableContainer>
						<Heading>Applications</Heading>
						<StudentTable lorApplications={lorApplications} handleStatusClick={handleClick} />
					</SmallTableContainer>
				)
			)}
			<PendingModal isOpen={pendingIsOpen} onClose={pendingOnClose} modalData={modalData} />
			<GrantedModal isOpen={grantedIsOpen} onClose={grantedOnClose} modalData={modalData} />
		</>
	);
};

export default StudentDashboard;
