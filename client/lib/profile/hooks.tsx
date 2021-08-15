import { StudentContext, Student } from "context/student";
import { useContext, useEffect, useState } from "react";
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
import uploadFile from "aws/uploadFile";
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
	const [testScores, setTestScores] = useState<TestScoreInput[]>([]);

	const router = useRouter();

	useEffect(() => {
		fetchStudent();
	}, [student]);

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

	let documentUrls: string[] = [];
	const uploadDocuments = async (resultOne: File, resultTwo: File, resultThree: File, proofOfAcceptance: File) => {
		if (resultOne) documentUrls[0] = await uploadFile(resultOne, "proofOfResults");
		if (resultTwo) documentUrls[1] = await uploadFile(resultTwo, "proofOfResults");
		if (resultThree) documentUrls[2] = await uploadFile(resultThree, "proofOfResults");
		if (proofOfAcceptance) documentUrls[3] = await uploadFile(proofOfAcceptance, "proofOfAcceptance");
	};

	const onSubmit = handleSubmit(async (data, event) => {
		event.preventDefault();
		let newTestScore: TestScoreInput;
		try {
			await uploadDocuments(
				data.resultOne?.[0],
				data.resultTwo?.[0],
				data.resultThree?.[0],
				data.proofOfAcceptance?.[0]
			);
		} catch (error) {
			console.error(error);
		}

		if (data.examOne && data.scoreOne && documentUrls?.[0]) {
			newTestScore = {
				exam: data.examOne,
				score: data.scoreOne,
				proofOfResult: documentUrls?.[0],
			};
			const newScores: TestScoreInput[] = testScores;
			newScores.push(newTestScore);
			setTestScores(newScores);
		}

		if (data.examTwo && data.scoreTwo && documentUrls?.[1]) {
			newTestScore = {
				exam: data.examTwo,
				score: data.scoreTwo,
				proofOfResult: documentUrls?.[1],
			};
			const newScores: TestScoreInput[] = testScores;
			newScores.push(newTestScore);
			setTestScores(newScores);
		}

		if (data.examThree && data.scoreThree && documentUrls?.[2]) {
			newTestScore = {
				exam: data.examThree,
				score: data.scoreThree,
				proofOfResult: documentUrls?.[2],
			};
			const newScores: TestScoreInput[] = testScores;
			newScores.push(newTestScore);
			setTestScores(newScores);
		}

		const input: UpdateStudentInput = {
			id: user.id,
			acceptedUniversity: data.acceptedUniversity.value,
			appliedUniversities: data.appliedUniversities.map(university => university.value),
			testScores,
			proofOfAcceptance: documentUrls?.[3] ?? null,
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
