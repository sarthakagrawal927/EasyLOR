import { FC } from "react";
import { useDisclosure, Modal, ModalOverlay, ModalContent, ModalCloseButton } from "@chakra-ui/react";
import {
	UploadButton,
	CustomModalHeader,
	CustomModalBody,
	SendButton,
	ModalButtonContainer,
} from "./uploadLORModal.styled";

import FileUpload from "components/FileUpload/FileUpload";
import { useRouter } from "next/router";
import { useViewApplication } from "lib/viewApplication/hooks";

const UploadLORModal: FC = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const router = useRouter();
	const { id } = router.query;
	const { register, files, handleSubmit } = useViewApplication(id?.toString());

	return (
		<>
			<UploadButton onClick={onOpen} variant="solid">
				UPLOAD LOR
			</UploadButton>
			<Modal onClose={onClose} isOpen={isOpen} size="lg" scrollBehavior="inside" isCentered>
				<ModalOverlay />
				<ModalContent flex="column" height="30%">
					<CustomModalHeader>{"UPLOAD LOR PDF"}</CustomModalHeader>
					<ModalCloseButton />
					<CustomModalBody>
						{files && files[0] && files[0].name}
						<ModalButtonContainer>
							<FileUpload
								accept={".doc,.docx,.pdf"}
								multiple={false}
								register={register("lorURL", { required: true })}
							>
								<SendButton variant="solid">UPLOAD FILE</SendButton>
							</FileUpload>
							<SendButton variant="outline" onClick={handleSubmit}>
								Submit
							</SendButton>
						</ModalButtonContainer>
					</CustomModalBody>
				</ModalContent>
			</Modal>
		</>
	);
};

export default UploadLORModal;
