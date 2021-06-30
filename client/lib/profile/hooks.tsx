import { StudentContext, Student } from "context/student";
import { useContext, useEffect } from "react";
import { TestScoreInput, useUpdateStudentMutation } from "entities/types.graphql";
import { Option } from "components/SearchMultiSelect";
import {
	Control,
	DeepMap,
	FieldError,
	useForm,
	UseFormGetValues,
	UseFormRegister,
	UseFormReset,
	UseFormWatch,
} from "react-hook-form";
import { createStandaloneToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { UpdateStudentInput } from "entities/types.graphql";
import { AuthContext } from "context/auth";

export type UpdateStudentFormInput = {
	acceptedUniversity: Option;
	appliedUniversities: Option[];
	examOne: string;
	scoreOne: string;
	examTwo: string;
	scoreTwo: string;
	examThree: string;
	scoreThree: string;
	resultOne: FileList;
	resultTwo: FileList;
	resultThree: FileList;
	proofOfAcceptance: FileList;
};
type UseProfileReturn = {
	student: Student;
	loading: boolean;
	getValues: UseFormGetValues<UpdateStudentFormInput>;
	updating: boolean;
	watch: UseFormWatch<UpdateStudentFormInput>;
	control: Control<UpdateStudentFormInput>;
	reset: UseFormReset<UpdateStudentFormInput>;
	errors: DeepMap<UpdateStudentFormInput, FieldError>;
	handleSubmit: (e?: React.BaseSyntheticEvent<object, any, any>) => Promise<void>;
	register: UseFormRegister<UpdateStudentFormInput>;
};

export const useProfile = (): UseProfileReturn => {
	const { student, loading, fetchStudent } = useContext(StudentContext);
	const { user } = useContext(AuthContext);

	const router = useRouter();

	useEffect(() => {
		fetchStudent();
	}, []);

	const defaultValues: UpdateStudentFormInput = {
		acceptedUniversity: null,
		appliedUniversities: [],
		examOne: "",
		examTwo: "",
		examThree: "",
		scoreOne: "",
		scoreTwo: "",
		scoreThree: "",
		resultOne: null,
		resultTwo: null,
		resultThree: null,
		proofOfAcceptance: null,
	};

	const toast = createStandaloneToast();
	const { register, handleSubmit, getValues, control, watch, formState, reset } = useForm<UpdateStudentFormInput>({
		defaultValues,
	});

	console.log(watch());

	const [updateStudent, { loading: updating, error }] = useUpdateStudentMutation({
		onError: error => {
			toast({
				title: "FAILED",
				description: error.graphQLErrors[0].message,
				status: "error",
				duration: 3000,
				position: "top",
				isClosable: true,
			});
		},
		onCompleted: data => {
			router.reload();
		},
	});

	const onSubmit = handleSubmit(async (data: UpdateStudentFormInput) => {
		let testScores: TestScoreInput[] = [];

		if (data.examOne && data.scoreOne && data.resultOne)
			testScores.push({
				exam: data.examOne,
				score: data.scoreOne,
				proofOfResult: data.resultOne?.[0]?.name,
			});
		if (data.examTwo && data.scoreTwo && data.resultTwo)
			testScores.push({
				exam: data.examTwo,
				score: data.scoreTwo,
				proofOfResult: data.resultTwo?.[0]?.name,
			});
		if (data.examThree && data.scoreThree && data.resultThree)
			testScores.push({
				exam: data.examThree,
				score: data.scoreThree,
				proofOfResult: data.resultThree?.[0]?.name,
			});
		const input: UpdateStudentInput = {
			id: user.id,
			acceptedUniversity: data.acceptedUniversity.value,
			appliedUniversities: data.appliedUniversities.map(university => {
				return university.value;
			}),
			testScores,
			proofOfAcceptance: data.proofOfAcceptance?.[0]?.name ?? null,
		};
		try {
			const { data: response } = await updateStudent({
				variables: {
					input,
				},
			});
			if (error) {
				throw new Error(error.message);
			}
			if (response) {
				toast({
					title: "SUCCESS",
					description: `${response.updateStudent.user.firstName}, your details have been updated.`,
					status: "success",
					duration: 3000,
					position: "top",
					isClosable: true,
				});
			}
		} catch (error) {
			console.error(error);
		}
	});

	return {
		errors: formState.errors,
		student,
		getValues,
		reset,
		loading,
		handleSubmit: onSubmit,
		watch,
		register,
		control,
		updating,
	};
};
