import { FC, useRef } from "react";
import { useDisclosure, Modal, ModalOverlay, ModalContent, ModalCloseButton, Textarea } from "@chakra-ui/react";
import { RejectButton, CustomModalHeader, CustomModalBody, ButtonContainer, SendButton } from "./rejectModal.styled";

type RejectApplicationProps = {
	getRejectionReason: (reason: string | null) => void;
};

const RejectModal: FC<RejectApplicationProps> = ({ getRejectionReason }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const reasonRef = useRef<HTMLTextAreaElement>();

	return (
		<>
			<RejectButton onClick={onOpen} alignSelf="flex-start" variant="solid">
				REJECT
			</RejectButton>
			<Modal onClose={onClose} isOpen={isOpen} size="lg" scrollBehavior="inside" isCentered>
				<ModalOverlay />
				<ModalContent>
					<CustomModalHeader>{"REASON FOR REJECTION"}</CustomModalHeader>
					<ModalCloseButton />
					<CustomModalBody>
						{"Why are you rejecting this application?"}
						<Textarea
							ref={reasonRef}
							placeholder="What can the student improve on?"
							rows={4}
							marginTop="15px"
						></Textarea>
						<ButtonContainer>
							<SendButton
								variant="solid"
								onClick={() => {
									onClose();
									getRejectionReason(reasonRef.current.value);
								}}
							>
								{"SEND"}
							</SendButton>
						</ButtonContainer>
					</CustomModalBody>
				</ModalContent>
			</Modal>
		</>
	);
};

export default RejectModal;
