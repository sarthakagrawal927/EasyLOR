import { Heading } from "@chakra-ui/layout";
import Link from "next/link";
import React, { FC } from "react";
import { RegisterContainer, RegisterForm, RegisterFormContainer } from "./register.styled";
import FirstForm from "./FirstForm";
import SecondForm from "./SecondForm";
import { useRegister } from "./hooks";

const Register: FC = () => {
	const {
		handleSubmit,
		isOpen,
		profilePhotoRegister,
		firstNameRegister,
		lastNameRegister,
		emailRegister,
		passwordRegister,
		confirmPasswordRegister,
		departmentRegister,
		errors,
		institutionRegister,
		regNoRegister,
		getValues,
		onToggle,
		loading,
	} = useRegister();
	return (
		<RegisterContainer>
			<RegisterFormContainer>
				<Heading>Register</Heading>
				<RegisterForm onSubmit={handleSubmit}>
					<FirstForm
						firstNameRegister={firstNameRegister}
						lastNameRegister={lastNameRegister}
						profilePhotoRegister={profilePhotoRegister}
						errors={errors}
						getValues={getValues}
						onToggle={onToggle}
						isOpen={isOpen}
					/>
					<SecondForm
						emailRegister={emailRegister}
						passwordRegister={passwordRegister}
						confirmPasswordRegister={confirmPasswordRegister}
						regNoRegister={regNoRegister}
						institutionRegister={institutionRegister}
						departmentRegister={departmentRegister}
						errors={errors}
						onToggle={onToggle}
						loading={loading}
						isOpen={isOpen}
					/>
				</RegisterForm>
				{!isOpen && <Link href="/login">Already have an account? Login</Link>}
			</RegisterFormContainer>
		</RegisterContainer>
	);
};
export default Register;
