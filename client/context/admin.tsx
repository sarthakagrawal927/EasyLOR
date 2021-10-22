import { Exact, GetAdminByUserIdQuery, useGetAdminByUserIdLazyQuery } from "entities/types.graphql";
import { createContext, useState, useContext } from "react";
import { AuthContext } from "context/auth";
import { createStandaloneToast } from "@chakra-ui/react";
import { QueryLazyOptions } from "@apollo/client";

export type Admin = Omit<GetAdminByUserIdQuery["getAdminByUserID"], "__typename">;

type AdminContextType = {
	admin?: Admin;
	loading?: boolean;
	fetchAdmin?: (
		options?: QueryLazyOptions<
			Exact<{
				id: string;
			}>
		>
	) => void;
};

const AdminContext = createContext<AdminContextType>({});

function AdminProvider(props) {
	const [admin, setAdmin] = useState<Admin>();
	const { user } = useContext(AuthContext);

	const toast = createStandaloneToast();

	const [fetchAdmin, { loading }] = useGetAdminByUserIdLazyQuery({
		variables: {
			id: user?.id,
		},
		onCompleted: data => {
			setAdmin(data.getAdminByUserID);
		},
		onError: error => {
			toast({
				title: "Something went wrong",
				description: error.message,
				status: "error",
				duration: 1000,
				position: "top",
				isClosable: true,
			});
			console.error("Could not fetch admin", error);
		},
	});

	return <AdminContext.Provider value={{ admin, loading, fetchAdmin }} {...props} />;
}

export { AdminContext, AdminProvider };
