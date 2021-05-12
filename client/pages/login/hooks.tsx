import { useForm, UseFormRegisterReturn, FieldError, DeepMap } from "react-hook-form";
import { createStandaloneToast } from "@chakra-ui/react";
import { useLoginUserMutation } from "../../entities/types.graphql";
import { AuthContext } from "../../context/auth";
import { useContext } from "react";
import { useRouter } from "next/router";

type UseLoginReturn = {
	emailRegister: UseFormRegisterReturn;
	passwordRegister: UseFormRegisterReturn;
	errors: DeepMap<LoginFormInputs, FieldError>;
	loading: boolean;
	handleSubmit: (e?: React.BaseSyntheticEvent<object, any, any>) => Promise<void>;
};

type LoginFormInputs = {
	email: string;
	password: string;
};

export const useLogin = (): UseLoginReturn => {
	const { login, user } = useContext(AuthContext);
	const router = useRouter();
	const defaultLoginValues = {
		email: "",
		password: "",
	};
	const {
		register,
		handleSubmit,
		formState: { errors: formErrors },
	} = useForm<LoginFormInputs>({
		defaultValues: defaultLoginValues,
	});

	const emailRegister = register("email", {
		required: true,
		minLength: 5,
		maxLength: 50,
	});
	const passwordRegister = register("password", {
		required: true,
		minLength: 5,
		maxLength: 50,
	});
	const toast = createStandaloneToast();

	const [loginUserMutation, { loading, error }] = useLoginUserMutation();

	const onSubmit = handleSubmit(async (data: LoginFormInputs) => {
		console.log("Logging In...: ", data);
		try {
			const { data: response } = await loginUserMutation({
				variables: {
					loginUserInput: data,
				},
			});
			if (error) {
				throw new Error(error.message);
			}

			if (data) {
				login(response.loginUser);
				router.push("/dashboard");
				toast({
					title: "Login Successful",
					description: "Welcome to EasyLOR",
					status: "success",
					duration: 5000,
					position: "top",
					isClosable: true,
				});
				console.log("Logged In: ", user.id);
			}
		} catch (error) {
			toast({
				title: "Login Failed",
				description: error.message,
				status: "error",
				duration: 5000,
				position: "top",
				isClosable: true,
			});
			console.error(error);
		}
	});

	return {
		emailRegister,
		passwordRegister,
		errors: formErrors,
		loading,
		handleSubmit: onSubmit,
	};
};
