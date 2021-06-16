import { AuthContext } from "../../context/auth";
import { Student, useGetPastApplicationsByFacultyIdQuery } from "../../entities/types.graphql";
import { useContext } from "react";
import { createStandaloneToast } from "@chakra-ui/react";

type StudentWithoutLORApplication = Omit<Student, "lorApplications">;

type PastApplicationsReturn = {
	data: StudentWithoutLORApplication[] | null;
	loading: boolean;
};

export const usePastApplications = (): PastApplicationsReturn => {
	const toast = createStandaloneToast();

	const { user } = useContext(AuthContext);
	const { data, loading, error } = useGetPastApplicationsByFacultyIdQuery({
		variables: {
			id: user?.id,
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
		data: data?.getPastApplicationsByFacultyID,
		loading,
	};
};
