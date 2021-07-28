import {
	SimpleGrid,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	Avatar,
} from "@chakra-ui/react";
import { AvatarContainer, SOPContainer, StyledButton } from "./modal.styled";
import { AttachmentIcon } from "@chakra-ui/icons";

const getNameFromURL = (fileURL: string) => {
	if (fileURL.includes("http")) return fileURL.split("/")[4].split("-")[1].replaceAll("%20", " ");
	return fileURL;
};

function PreviewModal({ isOpen, onOpen, onClose, handleSubmit, modalData }) {
	let date = new Date(modalData.dueDate);

	let dateField = date.toLocaleDateString() === "1/1/1970" ? "No date selected" : date.toLocaleDateString();
	return (
		<>
			<StyledButton type="button" onClick={onOpen} colorScheme="blue" variant="solid" size="md">
				Preview
			</StyledButton>

			<Modal isOpen={isOpen} onClose={onClose} size="lg">
				<ModalOverlay />
				<ModalContent maxW="60%">
					<ModalHeader>Confirm your application details</ModalHeader>
					<ModalBody>
						<SimpleGrid columns={2}>
							<SimpleGrid columns={2} spacingY={4}>
								{" "}
								<strong>Department :</strong> {modalData.department || "Add department"}
								<strong>Faculty : </strong> {modalData.facultyName || "Add Faculty Name"}
								<strong>University :</strong> {modalData.university || "Add University Name"}
								<strong>Course : </strong> {modalData.course || "Add Course"}
								<strong> Due Date: </strong> {dateField}
								<strong>Statement Of Purpose: </strong>
							</SimpleGrid>
							<AvatarContainer>
								{" "}
								<Avatar src={modalData.profilePic} size="2xl" />
							</AvatarContainer>
						</SimpleGrid>

						<SOPContainer> {modalData.statementOfPurpose || "Add Statement of Purpose"}</SOPContainer>
						{modalData.draftURL && modalData.draftURL.length > 0 && (
							<>
								<a href={modalData.draftURL}>
									<AttachmentIcon w={6} h={6} color="blue" style={{ marginRight: "4px" }} />
								</a>
								{getNameFromURL(modalData.draftURL)}
							</>
						)}
					</ModalBody>

					<ModalFooter>
						<StyledButton colorScheme="blue" mr={3} onClick={onClose} size="md">
							Edit
						</StyledButton>
						<StyledButton
							size="md"
							type="submit"
							colorScheme="blue"
							variant="solid"
							onClick={() => {
								handleSubmit();
								onClose();
							}}
						>
							Submit
						</StyledButton>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
}

export default PreviewModal;
