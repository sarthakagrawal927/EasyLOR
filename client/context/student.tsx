import { QueryLazyOptions } from "@apollo/client";
import { createStandaloneToast } from "@chakra-ui/react";
import { Exact, GetStudentByUserIdQuery, useGetStudentByUserIdLazyQuery } from "entities/types.graphql";
import { createContext, useContext, useState } from "react";
import { AuthContext } from "./auth";

export type Student = Omit<GetStudentByUserIdQuery["getStudentByUserID"], "__typename">;

type StudentContextType = {
	student?: Student;
	loading?: boolean;
	fetchStudent?: (
		options?: QueryLazyOptions<
			Exact<{
				id: string;
			}>
		>
	) => void;
};

const StudentContext = createContext<StudentContextType>({});

function StudentProvider(props) {
	const [student, setStudent] = useState<Student>();

	const { user } = useContext(AuthContext);

	const toast = createStandaloneToast();

	const [fetchStudent, { loading }] = useGetStudentByUserIdLazyQuery({
		variables: {
			id: user?.id,
		},
		onCompleted: data => setStudent(data.getStudentByUserID),
		onError: error => {
			toast({
				title: "Something went wrong",
				description: error.message,
				status: "error",
				duration: 1000,
				position: "top",
				isClosable: true,
			});
			console.error("Could not fetch student", error);
		},
	});

	return <StudentContext.Provider value={{ student, fetchStudent, loading }} {...props} />;
}

export { StudentContext, StudentProvider };
