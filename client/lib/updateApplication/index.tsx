import { FC } from "react";
import { FormControl, SimpleGrid, GridItem, FormErrorMessage } from "@chakra-ui/react";
import {
	ApplicationFormContainer,
	BigTextarea,
	ApplicationFormLabel,
	ApplicationFormInput,
	IconSpan,
	ApplicationHeading,
} from "lib/newApplication/newApplication.styled";

import { useApplicationForm } from "./hooks";
import { DueDatePicker } from "../../components/DatePicker";
import PreviewModal from "../../components/modal";
import { useDisclosure } from "@chakra-ui/react";
import { CalendarIcon, AttachmentIcon, DeleteIcon } from "@chakra-ui/icons";
import FileUpload from "components/FileUpload/FileUpload";
import { colors } from "utils/styles";
import { useRouter } from "next/router";
import NavBar from "components/NavBar/NavBar";

const FillApplication: FC = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const router = useRouter();
	const { applicationID } = router.query;
	const { handleSubmit, register, makeModalData, setDateString, errors, student, draftName, deleteFile, files } =
		useApplicationForm(applicationID?.toString());
	let modalData = makeModalData();
	let errorMessage = "This Field is required";
	return (
		<>
			<NavBar user={student?.user} />
			<ApplicationFormContainer maxW="xxl">
				<ApplicationHeading>Update Your Application</ApplicationHeading>
				<form onSubmit={handleSubmit}>
					<SimpleGrid columns={2} spacingX={14}>
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
						<GridItem colSpan={2}>
							{(files && files[0] && files[0].name) || draftName || "LOR Draft"}
							<IconSpan>
								{((files && files[0] && files[0].name) || draftName) && (
									<DeleteIcon w={6} h={6} color="red" onClick={deleteFile} />
								)}
							</IconSpan>
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

						<GridItem colSpan={2}>
							Due Date
							<label>
								<IconSpan>
									<CalendarIcon w={6} h={6} color="blue" />
								</IconSpan>
								<DueDatePicker
									setDateString={setDateString}
									initialState={modalData?.dueDate ? Date.parse(modalData?.dueDate) : null}
								/>
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
		</>
	);
};

export default FillApplication;
