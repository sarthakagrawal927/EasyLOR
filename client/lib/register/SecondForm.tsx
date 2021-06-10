import { Slide, FormControl, FormLabel, Input, Button, Flex, FormErrorMessage } from "@chakra-ui/react";
import React, { FC } from "react";
import { useRegister } from "../../lib/register/hooks";
import { RegisterButton, RegisterFieldSubContainer } from "../../lib/register/register.styled";

type SecondFormProps = {
	emailRegister: ReturnType<typeof useRegister>["emailRegister"];
	passwordRegister: ReturnType<typeof useRegister>["passwordRegister"];
	confirmPasswordRegister: ReturnType<typeof useRegister>["confirmPasswordRegister"];
	regNoRegister: ReturnType<typeof useRegister>["regNoRegister"];
	institutionRegister: ReturnType<typeof useRegister>["institutionRegister"];
	departmentRegister: ReturnType<typeof useRegister>["departmentRegister"];
	loading: boolean;
	errors: ReturnType<typeof useRegister>["errors"];
	onToggle: ReturnType<typeof useRegister>["onToggle"];
	isOpen: ReturnType<typeof useRegister>["isOpen"];
};

const SecondForm: FC<SecondFormProps> = ({
	emailRegister,
	passwordRegister,
	confirmPasswordRegister,
	regNoRegister,
	institutionRegister,
	departmentRegister,
	errors,
	loading,
	onToggle,
	isOpen,
}) => {
	let zIdxValue = isOpen ? 10 : -10;

	return (
		<Slide
			in={isOpen}
			unmountOnExit={true}
			direction="right"
			style={{ zIndex: zIdxValue, width: "30vw", position: "relative" }}
		>
			<RegisterFieldSubContainer>
				<FormControl id="email" isInvalid={!!errors.email}>
					<FormLabel>Email</FormLabel>
					<Input name={emailRegister?.name} type="email" ref={emailRegister?.ref} onChange={emailRegister?.onChange} />
					<FormErrorMessage>{errors.email?.message}</FormErrorMessage>
				</FormControl>
				<FormControl id="regNo">
					<FormLabel>Registration Number</FormLabel>
					<Input name={regNoRegister?.name} type="text" ref={regNoRegister?.ref} onChange={regNoRegister?.onChange} />
					{errors.regNo && <FormErrorMessage>{errors.regNo}</FormErrorMessage>}
				</FormControl>
			</RegisterFieldSubContainer>
			<RegisterFieldSubContainer>
				<FormControl id="password" isInvalid={!!errors.password}>
					<FormLabel>Password</FormLabel>
					<Input
						name={passwordRegister?.name}
						type="password"
						ref={passwordRegister?.ref}
						onChange={passwordRegister?.onChange}
					/>
					<FormErrorMessage>{errors.password?.message}</FormErrorMessage>
				</FormControl>
				<FormControl id="confirmPassword" isInvalid={!!errors.confirmPassword}>
					<FormLabel>Confirm Password</FormLabel>
					<Input
						name={confirmPasswordRegister?.name}
						type="password"
						ref={confirmPasswordRegister?.ref}
						onChange={confirmPasswordRegister?.onChange}
					/>
					<FormErrorMessage>{errors.confirmPassword?.message}</FormErrorMessage>
				</FormControl>
			</RegisterFieldSubContainer>
			<RegisterFieldSubContainer>
				<FormControl id="institution" isInvalid={!!errors.institution}>
					<FormLabel>Institution</FormLabel>
					<Input
						name={institutionRegister?.name}
						type="text"
						ref={institutionRegister?.ref}
						onChange={institutionRegister?.onChange}
					/>
					<FormErrorMessage>{errors.institution?.message}</FormErrorMessage>
				</FormControl>
				<FormControl id="department" isInvalid={!!errors.department}>
					<FormLabel>Department</FormLabel>
					<Input
						name={departmentRegister?.name}
						type="text"
						ref={departmentRegister?.ref}
						onChange={departmentRegister?.onChange}
					/>
					<FormErrorMessage>{errors.department?.message}</FormErrorMessage>
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
