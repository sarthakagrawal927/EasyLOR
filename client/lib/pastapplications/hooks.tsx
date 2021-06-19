import { User, Student, useGetPastApplicationsByFacultyIdQuery } from "../../entities/types.graphql";
import { useContext, useEffect } from "react";
import { createStandaloneToast } from "@chakra-ui/react";
import { FacultyContext } from "context/faculty";

type StudentWithoutLORApplication = Omit<Student, "lorApplications">;

type PastApplicationsReturn = {
	user: User;
	data: StudentWithoutLORApplication[] | null;
	loading: boolean;
};

export const usePastApplications = (): PastApplicationsReturn => {
	const toast = createStandaloneToast();

	const { faculty } = useContext(FacultyContext);

	const { data, loading, error } = useGetPastApplicationsByFacultyIdQuery({
		variables: {
			id: faculty?.user.id,
		},
		onError: error => {
			toast({
				title: "FAILED",
				description: error.message,
				status: "error",
				duration: 3000,
				position: "top",
				isClosable: true,
			});
		},
	});

	return {
		user: faculty?.user,
		data: data?.getPastApplicationsByFacultyID,
		loading,
	};
};
