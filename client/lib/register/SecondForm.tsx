import { FormControl, FormLabel, Input, Button, Flex, FormErrorMessage, Select } from "@chakra-ui/react";
import React, { FC } from "react";
import { useRegister } from "../../lib/register/hooks";
import { RegisterButton, RegisterFieldSubContainer, Slide } from "./register.styled";

type SecondFormProps = {
	contactRegister: ReturnType<typeof useRegister>["contactRegister"];
	passwordRegister: ReturnType<typeof useRegister>["passwordRegister"];
	confirmPasswordRegister: ReturnType<typeof useRegister>["confirmPasswordRegister"];
	regNoRegister: ReturnType<typeof useRegister>["regNoRegister"];
	institutionRegister: ReturnType<typeof useRegister>["institutionRegister"];
	departmentRegister: ReturnType<typeof useRegister>["departmentRegister"];
	departments: ReturnType<typeof useRegister>["departments"];
	departmentsError: ReturnType<typeof useRegister>["departmentsError"];
	loading: boolean;
	errors: ReturnType<typeof useRegister>["errors"];
	onToggle: ReturnType<typeof useRegister>["onToggle"];
	isOpen: ReturnType<typeof useRegister>["isOpen"];
};

const SecondForm: FC<SecondFormProps> = ({
	contactRegister,
	passwordRegister,
	confirmPasswordRegister,
	regNoRegister,
	departments,
	departmentsError,
	institutionRegister,
	departmentRegister,
	errors,
	loading,
	onToggle,
	isOpen,
}) => {
	return (
		<Slide in={isOpen} unmountOnExit={true} direction="right" style={{ width: "30vw", position: "relative" }}>
			<RegisterFieldSubContainer>
				<FormControl id="contact" isInvalid={!!errors?.contact}>
					<FormLabel>Contact</FormLabel>
					<Input
						name={contactRegister?.name}
						type="tel"
						ref={contactRegister?.ref}
						onChange={contactRegister?.onChange}
					/>
					<FormErrorMessage color={"red"}>{errors?.contact?.message}</FormErrorMessage>
				</FormControl>
				<FormControl id="regNo" isInvalid={!!errors?.regNo}>
					<FormLabel>Registration Number</FormLabel>
					<Input
						name={regNoRegister?.name}
						type="text"
						ref={regNoRegister?.ref}
						onChange={regNoRegister?.onChange}
					/>
					<FormErrorMessage color={"red"}>{errors?.regNo}</FormErrorMessage>
				</FormControl>
			</RegisterFieldSubContainer>
			<RegisterFieldSubContainer>
				<FormControl id="password" isInvalid={!!errors?.password}>
					<FormLabel>Password</FormLabel>
					<Input
						name={passwordRegister?.name}
						type="password"
						ref={passwordRegister?.ref}
						onChange={passwordRegister?.onChange}
					/>
					<FormErrorMessage color={"red"}>{errors?.password?.message}</FormErrorMessage>
				</FormControl>
				<FormControl id="confirmPassword" isInvalid={!!errors?.confirmPassword}>
					<FormLabel>Confirm Password</FormLabel>
					<Input
						name={confirmPasswordRegister?.name}
						type="password"
						ref={confirmPasswordRegister?.ref}
						onChange={confirmPasswordRegister?.onChange}
					/>
					<FormErrorMessage color={"red"}>{errors?.confirmPassword?.message}</FormErrorMessage>
				</FormControl>
			</RegisterFieldSubContainer>
			<RegisterFieldSubContainer>
				<FormControl id="institution" isInvalid={!!errors?.institution}>
					<FormLabel>Institution</FormLabel>
					<Input
						name={institutionRegister?.name}
						type="text"
						ref={institutionRegister?.ref}
						onChange={institutionRegister?.onChange}
					/>
					<FormErrorMessage color={"red"}>{errors?.institution?.message}</FormErrorMessage>
				</FormControl>
				<FormControl id="department" isInvalid={!!errors?.department}>
					<FormLabel>Department</FormLabel>
					<Select
						name={departmentRegister?.name}
						type="text"
						ref={departmentRegister?.ref}
						onChange={departmentRegister?.onChange}
					>
						{departmentsError && (
							<FormErrorMessage color={"red"}>{departmentsError.message}</FormErrorMessage>
						)}
						{departments?.map(department => (
							<option key={department.id} value={department.id}>
								{department.name}
							</option>
						))}
					</Select>
					<FormErrorMessage color={"red"}>{errors?.department?.message}</FormErrorMessage>
				</FormControl>
			</RegisterFieldSubContainer>
			<Flex flexDirection="row" alignItems="baseline" width="100%" justifyContent="space-between">
				<Button variant="link" onClick={onToggle} marginTop="2em">
					Back
				</Button>
				<RegisterButton
					isLoading={loading}
					loadingText={"Registering..."}
					type="submit"
					variant="solid"
					marginTop="2em"
					width="45%"
				>
					Register
				</RegisterButton>
			</Flex>
		</Slide>
	);
};

export default SecondForm;
