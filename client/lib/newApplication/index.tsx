import { FC } from "react";
import { FormControl, SimpleGrid, GridItem, Grid, Select, FormErrorMessage } from "@chakra-ui/react";
import {
	ApplicationFormContainer,
	BigTextarea,
	ApplicationFormLabel,
	ApplicationFormInput,
	IconSpan,
	ApplicationHeading,
	ConfirmButton,
} from "lib/newApplication/newApplication.styled";

import { useApplicationForm } from "./hooks";
import { DueDatePicker } from "../../components/DatePicker";
import PreviewModal from "../../components/modal";
import { useDisclosure } from "@chakra-ui/react";
import { CalendarIcon, AttachmentIcon } from "@chakra-ui/icons";
import FileUpload from "components/FileUpload/FileUpload";
import { colors } from "utils/styles";

const FillApplication: FC = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	const { handleSubmit, register, faculties, departments, updateFaculty, makeModalData, setDateString, errors } =
		useApplicationForm();
	let modalData = makeModalData();
	let errorMessage = "This Field is required";
	return (
		<ApplicationFormContainer maxW="xxl">
			<ApplicationHeading>Fill Your Application</ApplicationHeading>
			<form onSubmit={handleSubmit}>
				<SimpleGrid columns={2} spacingX={14}>
					<FormControl id="department" isInvalid={!!errors.department}>
						<ApplicationFormLabel>Department</ApplicationFormLabel>
						{departments && faculties && (
							<Grid templateColumns="repeat(4,1fr)" gap={4}>
								<GridItem colSpan={3}>
									{departments && (
										<Select
											placeholder=" "
											{...register("department", { required: { value: true, message: errorMessage } })}
										>
											{departments.map((item, index) => {
												return <option key={index}>{item.name}</option>;
											})}
										</Select>
									)}
								</GridItem>
								<GridItem colSpan={1}>
									<ConfirmButton colorScheme="blue" variant="solid" size="md" onClick={updateFaculty} type="button">
										Confirm
									</ConfirmButton>
								</GridItem>
							</Grid>
						)}
						<FormErrorMessage>{errors.department?.message}</FormErrorMessage>
					</FormControl>
					<FormControl id="faculty" isInvalid={!!errors.facultyID}>
						<ApplicationFormLabel>Faculty</ApplicationFormLabel>
						<Select placeholder=" " {...register("facultyID", { required: { value: true, message: errorMessage } })}>
							{faculties.map((item, index) => {
								return (
									<option key={index} value={item.user.id}>
										{item.user.firstName} {item.user.lastName}
									</option>
								);
							})}
						</Select>
						<FormErrorMessage>{errors.facultyID?.message}</FormErrorMessage>
					</FormControl>
					<FormControl id="course" isInvalid={!!errors.course}>
						<ApplicationFormLabel>Course</ApplicationFormLabel>
						<ApplicationFormInput
							placeholder="Specify the course you are applying for"
							{...register("course", { required: { value: true, message: errorMessage } })}
						/>
						<FormErrorMessage>{errors.course?.message}</FormErrorMessage>
					</FormControl>
					<FormControl id="university" isInvalid={!!errors.university}>
						<ApplicationFormLabel>University</ApplicationFormLabel>
						<ApplicationFormInput
							placeholder="University for this LOR"
							{...register("university", { required: { value: true, message: errorMessage } })}
						/>
						<FormErrorMessage>{errors.university?.message}</FormErrorMessage>
					</FormControl>
				</SimpleGrid>
				<FormControl id="statementOfPurpose" isInvalid={!!errors.statementOfPurpose}>
					<ApplicationFormLabel>Statement Of Purpose</ApplicationFormLabel>
					<BigTextarea
						placeholder="What makes you worthy of this LOR"
						{...register("statementOfPurpose", { required: { value: true, message: errorMessage } })}
					/>
					<FormErrorMessage>{errors.statementOfPurpose?.message}</FormErrorMessage>
				</FormControl>

				<SimpleGrid columns={5} spacingX={4} style={{ marginTop: "1em" }}>
					<GridItem>
						LOR Draft
						<IconSpan>
							<FileUpload
								accept={".doc,.docx,.pdf"}
								multiple={false}
								register={register("draftURL")}
								fromNewApplication={true}
							>
								<AttachmentIcon w={6} h={6} color={colors.lightBlue} />
							</FileUpload>
						</IconSpan>
					</GridItem>
					<GridItem colSpan={3}>
						Due Date
						<label>
							<IconSpan>
								<CalendarIcon w={6} h={6} color="blue" />
							</IconSpan>
							<DueDatePicker setDateString={setDateString} />
						</label>
					</GridItem>
				</SimpleGrid>
				<br />
			</form>
			<PreviewModal
				isOpen={isOpen}
				onOpen={onOpen}
				onClose={onClose}
				handleSubmit={handleSubmit}
				modalData={modalData}
			/>
		</ApplicationFormContainer>
	);
};

export default FillApplication;
