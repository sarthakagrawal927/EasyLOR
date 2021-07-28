import { Heading } from "@chakra-ui/layout";
import Link from "next/link";
import React, { FC } from "react";
import { RegisterContainer, RegisterForm, RegisterFormContainer } from "../../lib/register/register.styled";
import FirstForm from "../../lib/register/FirstForm";
import SecondForm from "../../lib/register/SecondForm";
import { useRegister } from "../../lib/register/hooks";

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
		contactRegister,
		errors,
		institutionRegister,
		regNoRegister,
		getValues,
		onToggle,
		loading,
		departments,
		departmentsError,
		profilePhotoUrl,
	} = useRegister();
	return (
		<RegisterContainer>
			<RegisterFormContainer>
				<Heading>Register</Heading>
				<RegisterForm onSubmit={handleSubmit}>
					<FirstForm
						profilePhotoUrl={profilePhotoUrl}
						emailRegister={emailRegister}
						firstNameRegister={firstNameRegister}
						lastNameRegister={lastNameRegister}
						profilePhotoRegister={profilePhotoRegister}
						errors={errors}
						getValues={getValues}
						onToggle={onToggle}
						isOpen={isOpen}
					/>
					<SecondForm
						departments={departments}
						departmentsError={departmentsError}
						contactRegister={contactRegister}
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
					{!isOpen && <Link href="/login">Already have an account? Login</Link>}
				</RegisterForm>
			</RegisterFormContainer>
		</RegisterContainer>
	);
};
export default Register;
