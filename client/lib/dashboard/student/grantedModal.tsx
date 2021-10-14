import { Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalBody, Button } from "@chakra-ui/react";
import { HugeHeading, SpacedButtonLink, GrayModalHeader, GreenTickBox, GrantedModalBody } from "../dashboard.styled";
import GreenTick from "components/icons/GreenTick";
function GrantedModal({ isOpen, onClose, modalData }) {
	return (
		<>
			<Modal isOpen={isOpen} onClose={onClose} size="lg">
				<ModalOverlay />
				<ModalContent maxW="40%">
					<GrayModalHeader>APPLICATION GRANTED</GrayModalHeader>
					<ModalCloseButton />
					<GrantedModalBody>
						<HugeHeading> CONGRATULATIONS</HugeHeading>
						<GreenTickBox>
							<GreenTick />
						</GreenTickBox>
						<p style={{ textAlign: "center" }}>
							{`Your application has been granted by ${modalData?.faculty?.user?.firstName} ${modalData?.faculty?.user?.lastName}`}
						</p>
						<SpacedButtonLink>
							<a href={modalData?.lorURL} download>
								<Button variant="solid">Download</Button>
							</a>
						</SpacedButtonLink>
					</GrantedModalBody>
				</ModalContent>
			</Modal>
		</>
	);
}

export default GrantedModal;
