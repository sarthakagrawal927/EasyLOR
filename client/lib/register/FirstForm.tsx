import { ArrowForwardIcon } from "@chakra-ui/icons";
import { FormControl, FormErrorMessage, FormLabel, IconButton, Input, Center, Avatar } from "@chakra-ui/react";
import FileUpload from "components/FileUpload/FileUpload";
import AvatarPlaceholder from "components/icons/AvatarPlaceholder";
import React, { FC } from "react";
import { RegisterFieldContainer, Slide } from "./register.styled";
import { useRegister } from "./hooks";

type FirstFormProps = {
	emailRegister: ReturnType<typeof useRegister>["emailRegister"];
	firstNameRegister: ReturnType<typeof useRegister>["firstNameRegister"];
	lastNameRegister: ReturnType<typeof useRegister>["lastNameRegister"];
	profilePhotoRegister: ReturnType<typeof useRegister>["profilePhotoRegister"];
	isOpen: ReturnType<typeof useRegister>["isOpen"];
	errors: ReturnType<typeof useRegister>["errors"];
	onToggle: ReturnType<typeof useRegister>["onToggle"];
	getValues: ReturnType<typeof useRegister>["getValues"];
	profilePhotoUrl: string;
};

const FirstForm: FC<FirstFormProps> = ({
	firstNameRegister,
	lastNameRegister,
	emailRegister,
	profilePhotoRegister,
	isOpen,
	getValues,
	profilePhotoUrl,
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
				{profilePhotoUrl ? (
					<Center>
						<Avatar src={profilePhotoUrl} boxSize={120} />
					</Center>
				) : (
					<FileUpload accept={"image/*"} multiple={false} register={profilePhotoRegister}>
						<IconButton
							aria-label="Profile Photo"
							icon={<AvatarPlaceholder boxSize={120} />}
							isRound
							boxSize={100}
							style={{ margin: "0 auto" }}
						/>
					</FileUpload>
				)}

				<FormErrorMessage>{errors.profilePhoto?.message}</FormErrorMessage>
			</FormControl>
			<FormControl id="email" isInvalid={!!errors.email}>
				<FormLabel>Email</FormLabel>
				<Input
					name={emailRegister?.name}
					type="email"
					ref={emailRegister?.ref}
					onChange={emailRegister?.onChange}
				/>
				<FormErrorMessage>{errors.email?.message}</FormErrorMessage>
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
