import { ArrowForwardIcon } from "@chakra-ui/icons";
import { FormControl, FormErrorMessage, FormLabel, IconButton, Input, Slide, Center } from "@chakra-ui/react";
import FileUpload from "components/FileUpload/FileUpload";
import AvatarPlaceholder from "components/icons/AvatarPlaceholder";
import React, { FC } from "react";
import { RegisterFieldContainer } from "./register.styled";
import { useRegister } from "./hooks";

type FirstFormProps = {
	firstNameRegister: ReturnType<typeof useRegister>["firstNameRegister"];
	lastNameRegister: ReturnType<typeof useRegister>["lastNameRegister"];
	profilePhotoRegister: ReturnType<typeof useRegister>["profilePhotoRegister"];
	isOpen: ReturnType<typeof useRegister>["isOpen"];
	errors: ReturnType<typeof useRegister>["errors"];
	onToggle: ReturnType<typeof useRegister>["onToggle"];
	getValues: ReturnType<typeof useRegister>["getValues"];
};

const FirstForm: FC<FirstFormProps> = ({
	firstNameRegister,
	lastNameRegister,
	profilePhotoRegister,
	isOpen,
	getValues,
	errors,
	onToggle,
}) => {
	return (
		<Slide
			direction="left"
			in={!isOpen}
			style={{ zIndex: 5, width: "30vw", position: "relative" }}
			unmountOnExit={true}
		>
			<FormControl isInvalid={!!errors.profilePhoto}>
				<FileUpload accept={"image/*"} multiple={false} register={profilePhotoRegister}>
					<IconButton
						aria-label="Profile Photo"
						icon={<AvatarPlaceholder boxSize={120} />}
						isRound
						boxSize={120}
						style={{ margin: "0 auto" }}
					/>
				</FileUpload>
				<FormErrorMessage>{errors.profilePhoto?.name?.message}</FormErrorMessage>
			</FormControl>
			<RegisterFieldContainer>
				<FormControl id="firstName" isInvalid={!!errors.firstName}>
					<FormLabel>First Name</FormLabel>
					<Input
						name={firstNameRegister?.name}
						type="text"
						ref={firstNameRegister?.ref}
						onChange={firstNameRegister?.onChange}
						defaultValue={getValues("firstName")}
					/>
					<FormErrorMessage>{errors.firstName?.message}</FormErrorMessage>
				</FormControl>
				<FormControl id="lastName" isInvalid={!!errors.lastName}>
					<FormLabel>Last Name</FormLabel>
					<Input
						name={lastNameRegister?.name}
						type="text"
						ref={lastNameRegister?.ref}
						onChange={lastNameRegister?.onChange}
						defaultValue={getValues("lastName")}
					/>
					<FormErrorMessage>{errors.lastName?.message}</FormErrorMessage>
				</FormControl>
			</RegisterFieldContainer>
			<Center>
				<IconButton
					variant="solid"
					aria-label="forward"
					icon={<ArrowForwardIcon boxSize={10} />}
					isRound
					boxSize={16}
					marginTop={10}
					onClick={onToggle}
				/>
			</Center>
		</Slide>
	);
};

export default FirstForm;
