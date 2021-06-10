import { AuthContext } from "context/auth";
import { useContext } from "react";
import { useRouter } from "next/router";
import { DeepMap, FieldError, useForm, UseFormGetValues, UseFormRegisterReturn, UseFormWatch } from "react-hook-form";
import { CreateUserInput, useCreateUserMutation, UserType } from "entities/types.graphql";
import { uploadPhoto } from "api/serverless/index";
import { validateFiles } from "components/FileUpload/FileUpload";
import { createStandaloneToast, useDisclosure } from "@chakra-ui/react";

type UseRegisterReturn = {
	emailRegister: UseFormRegisterReturn;
	passwordRegister: UseFormRegisterReturn;
	confirmPasswordRegister: UseFormRegisterReturn;
	firstNameRegister: UseFormRegisterReturn;
	lastNameRegister: UseFormRegisterReturn;
	institutionRegister: UseFormRegisterReturn;
	regNoRegister: UseFormRegisterReturn;
	watch: UseFormWatch<RegisterFormInputs>;
	getValues: UseFormGetValues<RegisterFormInputs>;
	loading: boolean;
	departmentRegister: UseFormRegisterReturn;
	profilePhotoRegister: UseFormRegisterReturn;
	errors: DeepMap<RegisterFormInputs, FieldError>;
	isOpen: boolean;
	onToggle: () => void;
	handleSubmit: (e?: React.BaseSyntheticEvent<object, any, any>) => Promise<void>;
};

type RegisterFormInputs = {
	email: string;
	password: string;
	confirmPassword: string;
	firstName: string;
	lastName: string;
	institution: string;
	regNo: string;
	department: string;
	profilePhoto: File;
};

function getFakeContact() {
	return Math.floor(Math.random() * (9999999999 - 1000000000 + 1)) + 100000000;
}

export const useRegister = (): UseRegisterReturn => {
	const { login, user } = useContext(AuthContext);

	const { isOpen, onToggle } = useDisclosure();
	const router = useRouter();

	const defaultRegisterValues = {
		email: "",
		password: "",
		confirmPassword: "",
		firstName: "",
		lastName: "",
		institution: "",
		regNo: "",
		department: "",
		profilePhoto: "",
	};

	const {
		register,
		handleSubmit,
		watch,
		getValues,
		formState: { errors: formErrors },
	} = useForm<RegisterFormInputs>({
		defaultValues: defaultRegisterValues,
		shouldFocusError: true,
		shouldUnregister: false,
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
	const confirmPasswordRegister = register("confirmPassword", {
		required: true,
		minLength: 5,
		maxLength: 50,
		validate: value => value === watch("password") || "Passwords do not match",
	});
	const firstNameRegister = register("firstName", {
		required: true,
		maxLength: 50,
	});
	const lastNameRegister = register("lastName", {
		maxLength: 50,
	});

	const institutionRegister = register("institution", {
		required: true,
	});

	const departmentRegister = register("department", {
		required: true,
	});
	const regNoRegister = register("regNo", {
		required: true,
		minLength: 5,
		maxLength: 15,
	});
	const profilePhotoRegister = register("profilePhoto", {
		required: true,
		validate: validateFiles,
	});

	const toast = createStandaloneToast();

	const [registerUserMutation, { loading, error }] = useCreateUserMutation();

	const onSubmit = handleSubmit(async (data: RegisterFormInputs) => {
		const uri = uploadPhoto(data.profilePhoto);
		delete data.confirmPassword;
		delete data.department;
		const userData: CreateUserInput = {
			...data,
			profilePhoto: uri,
			departmentID: "1a281959-53f6-444a-9977-0d5b4e8be842",
			contact: getFakeContact().toString(),
			userType: UserType.Student,
		};
		console.log("SUBMIT DATA: ", userData);

		try {
			const { data: response } = await registerUserMutation({
				variables: {
					createUserInput: userData,
				},
			});

			if (error) {
				throw new Error(error.message);
			}
			if (response) {
				login(response.createUser);
				router.push("/dashboard");
				toast({
					title: "SUCCESS",
					description: "Welcome to EasyLOR",
					status: "success",
					duration: 3000,
					position: "top",
					isClosable: true,
				});
				console.log("Logged In: ", user.id);
			}
		} catch (error) {
			toast({
				title: "FAILED",
				description: error.message,
				status: "error",
				duration: 3000,
				position: "top",
				isClosable: true,
			});
			console.error(error);
		}
	});

	return {
		emailRegister,
		passwordRegister,
		confirmPasswordRegister,
		firstNameRegister,
		lastNameRegister,
		institutionRegister,
		regNoRegister,
		departmentRegister,
		profilePhotoRegister,
		getValues,
		isOpen,
		onToggle,
		loading,
		watch,
		errors: formErrors,
		handleSubmit: onSubmit,
	};
};
