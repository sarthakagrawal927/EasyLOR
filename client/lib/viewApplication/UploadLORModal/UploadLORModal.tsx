import { FC, useRef } from "react";
import { useDisclosure, Modal, ModalOverlay, ModalContent, ModalCloseButton, Textarea } from "@chakra-ui/react";
import { UploadButton, CustomModalHeader, CustomModalBody, ButtonContainer, SendButton } from "./uploadLORModal.styled";

const UploadLORModal: FC = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const reasonRef = useRef<HTMLTextAreaElement>();

	return (
		<>
			<UploadButton onClick={onOpen} variant="solid">
				UPLOAD LOR
			</UploadButton>
			<Modal onClose={onClose} isOpen={isOpen} size="lg" scrollBehavior="inside" isCentered>
				<ModalOverlay />
				<ModalContent>
					<CustomModalHeader>{"UPLOAD LOR PDF"}</CustomModalHeader>
					<ModalCloseButton />
					<CustomModalBody>
						<ButtonContainer>
							<SendButton variant="solid">{"UPLOAD FILE"}</SendButton>
						</ButtonContainer>
					</CustomModalBody>
				</ModalContent>
			</Modal>
		</>
	);
};

export default UploadLORModal;
