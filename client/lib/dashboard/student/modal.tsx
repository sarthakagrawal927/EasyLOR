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
import { AvatarContainer, SOPContainer, StyledButton, StyledStatus } from "../dashboard.styled";
import { AttachmentIcon } from "@chakra-ui/icons";
import Link from "next/link";

const getNameFromURL = (fileURL: string) => {
	return fileURL.split("/")[4].split("-")[1].replaceAll("%20", " ");
};

function PreviewModal({ isOpen, onClose, modalData }) {
	let date = new Date(modalData?.dueDate);
	let statusClass = modalData?.status === "PENDING" ? "blue" : modalData?.status === "REJECTED" ? "red" : "green";
	let dateField = date.toLocaleDateString().split("/")[2] === "1970" ? "No date selected" : date.toLocaleDateString();
	return (
		<>
			<Modal isOpen={isOpen} onClose={onClose} size="lg">
				<ModalOverlay />
				<ModalContent maxW="60%">
					<ModalHeader>
						Application Details <StyledStatus className={statusClass}>{modalData?.status}</StyledStatus>{" "}
					</ModalHeader>
					<ModalBody>
						<SimpleGrid columns={2}>
							<SimpleGrid columns={2} spacingY={4}>
								{" "}
								<strong>Department :</strong>{" "}
								{modalData?.faculty.user.department.name || "Add department"}
								<strong>Faculty : </strong> {modalData?.faculty.user.firstName || "Add Faculty Name"}
								<strong>University :</strong> {modalData?.university || "Add University Name"}
								<strong>Course : </strong> {modalData?.course || "Add Course"}
								<strong> Due Date: </strong> {dateField}
								<strong>Status : </strong>
								{modalData?.status}
								<strong>Statement Of Purpose: </strong>
							</SimpleGrid>
							<AvatarContainer>
								{" "}
								<Avatar src={modalData?.faculty.user.profilePhoto} size="2xl" />
							</AvatarContainer>
						</SimpleGrid>

						<SOPContainer> {modalData?.statementOfPurpose || "Add Statement of Purpose"}</SOPContainer>
						{modalData?.draftURL && modalData?.draftURL.length > 0 && (
							<>
								<a href={modalData?.draftURL}>
									<AttachmentIcon w={6} h={6} color="blue" style={{ marginRight: "4px" }} />
								</a>
								{getNameFromURL(modalData?.draftURL)}
							</>
						)}
					</ModalBody>

					<ModalFooter>
						<StyledButton colorScheme="blue" mr={3} onClick={onClose} size="md">
							Close
						</StyledButton>
						{modalData?.status === "PENDING" && (
							<Link
								href={{
									pathname: "/updateApplication/[applicationID]",
									query: { applicationID: modalData.id },
								}}
							>
								<StyledButton
									size="md"
									type="submit"
									colorScheme="blue"
									variant="solid"
									onClick={onClose}
								>
									Edit
								</StyledButton>
							</Link>
						)}
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
}

export default PreviewModal;
