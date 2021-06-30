import React from "react";
import {
	ContainerLeft,
	ContainerRight,
	ProfileForm as Form,
	Attach,
	TestScoresFieldContainer,
	TestScoresContainer,
	SaveButton,
} from "lib/profile/profile.styled";
import { Flex, FormControl, FormErrorMessage, Text, FormLabel, Input } from "@chakra-ui/react";
import { Control, Controller, DeepMap, FieldError, UseFormRegister, UseFormReset, UseFormWatch } from "react-hook-form";
import SearchMultiSelect from "components/SearchMultiSelect";
import { UpdateStudentFormInput } from "./hooks";
import { useUniversities } from "./universities";
import { SmallCloseIcon } from "@chakra-ui/icons";
import FileUpload from "components/FileUpload/FileUpload";

type ProfileFormProps = {
	handleSubmit: (e?: React.BaseSyntheticEvent<object, any, any>) => Promise<void>;
	control: Control<UpdateStudentFormInput>;
	errors: DeepMap<UpdateStudentFormInput, FieldError>;
	register: UseFormRegister<UpdateStudentFormInput>;
	watch: UseFormWatch<UpdateStudentFormInput>;
	reset: UseFormReset<UpdateStudentFormInput>;
};

const ProfileForm: React.FC<ProfileFormProps> = ({ handleSubmit, control, errors, register, watch, reset }) => {
	const { universityOptions } = useUniversities();
	return (
		<Form onSubmit={handleSubmit}>
			<ContainerLeft>
				<FormControl id="appliedUniversities" isInvalid={!!errors?.appliedUniversities}>
					<FormLabel>Applied Universities</FormLabel>
					<Controller
						name="appliedUniversities"
						control={control}
						rules={{ required: true }}
						render={({ field: { onBlur, onChange, name, ref } }) => (
							<SearchMultiSelect
								isMulti={true}
								onChange={onChange}
								onBlur={onBlur}
								inputRef={ref}
								name={name}
								options={universityOptions}
							/>
						)}
					/>
					<FormErrorMessage color={"red"}>{errors?.acceptedUniversity?.value?.message}</FormErrorMessage>
				</FormControl>
				<TestScoresContainer>
					<FormLabel>Test Scores</FormLabel>
					<TestScoresFieldContainer>
						<FormControl id="examOne" isInvalid={!!errors?.examOne}>
							<Input
								name={register("examOne").name}
								ref={register("examOne").ref}
								onChange={register("examOne").onChange}
								placeholder="Exam One"
							/>
							<FormErrorMessage color={"red"}>{errors?.examOne?.message}</FormErrorMessage>
						</FormControl>
						<FormControl id="scoreOne" isInvalid={!!errors?.scoreOne}>
							<Input
								name={register("scoreOne").name}
								ref={register("scoreOne").ref}
								onChange={register("scoreOne").onChange}
								placeholder="Score"
							/>
							<FormErrorMessage color={"red"}>{errors?.scoreOne?.message}</FormErrorMessage>
						</FormControl>
						<FormControl id="resultOne" isInvalid={!!errors?.resultOne}>
							{watch("resultOne") ? (
								<Flex height="10" alignItems="center">
									<Text color="green">{watch("resultOne")[0]?.name ?? "Uploaded"}</Text>
									<SmallCloseIcon
										cursor="pointer"
										onClick={() => reset({ ...watch(), resultOne: null })}
									/>
								</Flex>
							) : (
								<FileUpload
									accept={".pdf,.doc"}
									multiple={false}
									register={register("resultOne", {
										validate: value => {
											if (!value && watch("scoreOne")) return "Please provide a result proof.";
											return true;
										},
									})}
								>
									<Attach>Attach Result</Attach>
								</FileUpload>
							)}
							<FormErrorMessage color={"red"}>{errors?.resultOne?.message}</FormErrorMessage>
						</FormControl>
						<FormControl id="examTwo" isInvalid={!!errors?.examTwo}>
							<Input
								name={register("examTwo").name}
								ref={register("examTwo").ref}
								onChange={register("examTwo").onChange}
								placeholder="Exam Two"
							/>
							<FormErrorMessage color={"red"}>{errors?.examTwo?.message}</FormErrorMessage>
						</FormControl>
						<FormControl id="scoreTwo" isInvalid={!!errors?.scoreTwo}>
							<Input
								name={register("scoreTwo").name}
								ref={register("scoreTwo").ref}
								onChange={register("scoreTwo").onChange}
								placeholder="Score"
							/>
							<FormErrorMessage color={"red"}>{errors?.scoreTwo?.message}</FormErrorMessage>
						</FormControl>
						<FormControl id="resultTwo" isInvalid={!!errors?.resultTwo}>
							{watch("resultTwo") ? (
								<Flex height="10" alignItems="center">
									<Text color="green">{watch("resultTwo")[0]?.name ?? "Uploaded"}</Text>
									<SmallCloseIcon
										cursor="pointer"
										onClick={() => reset({ ...watch(), resultTwo: null })}
									/>
								</Flex>
							) : (
								<FileUpload
									accept={".pdf,.doc"}
									multiple={false}
									register={register("resultTwo", {
										validate: value => {
											if (!value && watch("scoreTwo")) return "Please provide a result proof.";
											return true;
										},
									})}
								>
									<Attach>Attach Result</Attach>
								</FileUpload>
							)}
							<FormErrorMessage color={"red"}>{errors?.resultTwo?.message}</FormErrorMessage>
						</FormControl>
						<FormControl id="examThree" isInvalid={!!errors?.examThree}>
							<Input
								name={register("examThree").name}
								ref={register("examThree").ref}
								onChange={register("examThree").onChange}
								placeholder="Exam Three"
							/>
							<FormErrorMessage color={"red"}>{errors?.examThree?.message}</FormErrorMessage>
						</FormControl>
						<FormControl id="scoreThree" isInvalid={!!errors?.scoreThree}>
							<Input
								name={register("scoreThree").name}
								ref={register("scoreThree").ref}
								onChange={register("scoreThree").onChange}
								placeholder="Score"
							/>
							<FormErrorMessage color={"red"}>{errors?.scoreThree?.message}</FormErrorMessage>
						</FormControl>
						<FormControl id="resultThree" isInvalid={!!errors?.resultThree}>
							{watch("resultThree") ? (
								<Flex height="10" alignItems="center">
									<Text color="green">{watch("resultThree")[0]?.name ?? "Uploaded"}</Text>
									<SmallCloseIcon
										cursor="pointer"
										onClick={() => reset({ ...watch(), resultThree: null })}
									/>
								</Flex>
							) : (
								<FileUpload
									accept={".pdf,.doc"}
									multiple={false}
									register={register("resultThree", {
										validate: value => {
											if (!value && watch("scoreThree")) return "Please provide a result proof.";
											return true;
										},
									})}
								>
									<Attach>Attach Result</Attach>
								</FileUpload>
							)}
							<FormErrorMessage color={"red"}>{errors?.resultThree?.message}</FormErrorMessage>
						</FormControl>
					</TestScoresFieldContainer>
				</TestScoresContainer>
			</ContainerLeft>
			<ContainerRight>
				<FormControl id="acceptedUniversity" isInvalid={!!errors?.acceptedUniversity}>
					<FormLabel>Accepted University</FormLabel>
					<Controller
						name="acceptedUniversity"
						control={control}
						rules={{ required: true }}
						render={({ field: { onBlur, onChange, name, ref } }) => (
							<SearchMultiSelect
								isMulti={false}
								onBlur={onBlur}
								onChange={onChange}
								inputRef={ref}
								name={name}
								options={universityOptions}
							/>
						)}
					/>
					<FormErrorMessage color={"red"}>{errors?.appliedUniversities?.[0]?.value.message}</FormErrorMessage>
				</FormControl>
				<FormControl id="proofOfAcceptance" isInvalid={!!errors?.proofOfAcceptance}>
					<FormLabel>Proof of Acceptance</FormLabel>
					{watch("proofOfAcceptance") ? (
						<Flex height="10" alignItems="center">
							<Text color="green">{watch("proofOfAcceptance")[0]?.name ?? "Uploaded"}</Text>
							<SmallCloseIcon
								cursor="pointer"
								onClick={() => reset({ ...watch(), proofOfAcceptance: null })}
							/>
						</Flex>
					) : (
						<FileUpload
							accept={".pdf,.doc"}
							multiple={false}
							register={register("proofOfAcceptance", {
								validate: value => {
									if (!value && watch("acceptedUniversity")) return "Proof of acceptance is needed.";
									return true;
								},
							})}
						>
							<Attach>Attach Proof</Attach>
						</FileUpload>
					)}
					<FormErrorMessage color={"red"}>{errors?.proofOfAcceptance?.message}</FormErrorMessage>
				</FormControl>
				<SaveButton variant="solid" type="submit">
					Save
				</SaveButton>
			</ContainerRight>
		</Form>
	);
};

export default ProfileForm;
function watch(arg0: string) {
	throw new Error("Function not implemented.");
}
