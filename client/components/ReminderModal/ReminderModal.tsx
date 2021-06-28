import { FC } from "react";
import {
	useDisclosure,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalCloseButton,
	ModalBody,
	ModalFooter,
} from "@chakra-ui/react";
import { ViewButton, CustomModalHeader, CloseButton } from "./reminderModal.styled";
import { Reminder } from "entities/types.graphql";

type ReminderProps = {
	reminder: Reminder;
};

const ReminderModal: FC<ReminderProps> = ({ reminder }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	return (
		<>
			<ViewButton onClick={onOpen} alignSelf="flex-start" variant="solid">
				VIEW
			</ViewButton>
			<Modal onClose={onClose} isOpen={isOpen} size="md" scrollBehavior="inside" isCentered>
				<ModalOverlay />
				<ModalContent>
					<CustomModalHeader>
						Reminder by: {reminder.faculty.user.firstName + " " + reminder.faculty.user.lastName}
					</CustomModalHeader>
					<ModalCloseButton />
					<ModalBody>{reminder.message}</ModalBody>
					<ModalFooter>
						<CloseButton onClick={onClose} variant="solid">
							Close
						</CloseButton>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export default ReminderModal;
