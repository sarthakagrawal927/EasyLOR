import { useDisclosure } from "@chakra-ui/react";
import { Student, StudentContext } from "context/student";
import { useContext, useEffect, useState } from "react";

type UseStudentDashboardReturn = {
	student: Student;
	loading: boolean;
	handleClick: (id: string) => void;
	isOpen: boolean;
	onOpen: () => void;
	onClose: () => void;
	modalData: any;
};

export const useStudentDashboard = (): UseStudentDashboardReturn => {
	const { student, loading, fetchStudent } = useContext(StudentContext);
	const [modalData, setModalData] = useState(null);
	useEffect(() => {
		fetchStudent();
	}, []);

	const { isOpen, onOpen, onClose } = useDisclosure();

	const handleClick = (id: string) => {
		setModalData(serialToApplicationMap[id]);
		onOpen();
	};

	return {
		modalData,
		isOpen,
		onOpen,
		onClose,
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
