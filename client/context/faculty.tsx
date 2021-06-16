import { Exact, GetFacultyByUserIdQuery, useGetFacultyByUserIdLazyQuery } from "entities/types.graphql";
import { createContext, useState, useContext } from "react";
import { AuthContext } from "context/auth";
import { createStandaloneToast } from "@chakra-ui/react";
import { QueryLazyOptions } from "@apollo/client";

export type Faculty = Omit<GetFacultyByUserIdQuery["getFacultyByUserID"], "__typename">;

type FacultyContextType = {
	faculty?: Faculty;
	loading?: boolean;
	fetchFaculty?: (
		options?: QueryLazyOptions<
			Exact<{
				id: string;
			}>
		>
	) => void;
};

const FacultyContext = createContext<FacultyContextType>({});

function FacultyProvider(props) {
	const [faculty, setFaculty] = useState<Faculty>();
	const { user } = useContext(AuthContext);

	const toast = createStandaloneToast();

	const [fetchFaculty, { loading }] = useGetFacultyByUserIdLazyQuery({
		variables: {
			id: user?.id,
		},
		onCompleted: data => setFaculty(data.getFacultyByUserID),
		onError: error => {
			toast({
				title: "Something went wrong",
				description: error.message,
				status: "error",
				duration: 1000,
				position: "top",
				isClosable: true,
			});
			console.error("Could not fetch faculty", error);
		},
	});

	return <FacultyContext.Provider value={{ faculty, loading, fetchFaculty }} {...props} />;
}

export { FacultyContext, FacultyProvider };
