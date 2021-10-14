import { useDisclosure } from "@chakra-ui/react";
import { Student, StudentContext } from "context/student";
import { useContext, useEffect, useState } from "react";

type UseStudentDashboardReturn = {
	modalData: any;
	pendingIsOpen: boolean;
	pendingOnOpen: () => void;
	pendingOnClose: () => void;
	grantedIsOpen: boolean;
	grantedOnOpen: () => void;
	grantedOnClose: () => void;
	handleClick: (id: string, status: string) => void;
	student: Student;
	loading: boolean;
};

export const useStudentDashboard = (): UseStudentDashboardReturn => {
	const { student, loading, fetchStudent } = useContext(StudentContext);
	const [modalData, setModalData] = useState(null);
	useEffect(() => {
		fetchStudent();
	}, []);

	const { isOpen: pendingIsOpen, onOpen: pendingOnOpen, onClose: pendingOnClose } = useDisclosure();
	const { isOpen: grantedIsOpen, onOpen: grantedOnOpen, onClose: grantedOnClose } = useDisclosure();

	const handleClick = (id: string, status: string) => {
		setModalData(serialToApplicationMap[id]);
		if (status === "PENDING") {
			pendingOnOpen();
		} else if (status === "GRANTED") {
			grantedOnOpen();
		}
	};

	return {
		modalData,
		pendingIsOpen,
		pendingOnOpen,
		pendingOnClose,
		grantedIsOpen,
		grantedOnOpen,
		grantedOnClose,
		handleClick,
		student,
		loading,
	};
};

let serialToApplicationMap = new Map();
export const makeData = (student: Student) => {
	let data = [];
	let lorApplications = student?.lorApplications;
	for (let i = 0; i < lorApplications?.length; i++) {
		let lorApplication = {
			applicationNo: i + 1,
			department: lorApplications[i].faculty.user.department.name,
			name: lorApplications[i].faculty.user.firstName + " " + lorApplications[i].faculty.user.lastName,
			status: lorApplications[i].status,
		};
		data.push(lorApplication);
		serialToApplicationMap[i + 1] = lorApplications[i];
	}
	return data;
};
