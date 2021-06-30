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
import { ViewButton, CustomModalHeader, CustomModalBody } from "./reminderModal.styled";
import { Reminder } from "entities/types.graphql";

type ReminderProps = {
	reminder: Reminder;
	onUpdate: () => void;
};

const ReminderModal: FC<ReminderProps> = ({ reminder, onUpdate }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	return (
		<>
			<ViewButton
				onClick={() => {
					onOpen();
					onUpdate();
				}}
				alignSelf="flex-start"
				variant="solid"
			>
				VIEW
			</ViewButton>
			<Modal onClose={onClose} isOpen={isOpen} size="md" scrollBehavior="inside" isCentered>
				<ModalOverlay />
				<ModalContent>
					<CustomModalHeader>
						Reminder by: {reminder.faculty.user.firstName + " " + reminder.faculty.user.lastName}
					</CustomModalHeader>
					<ModalCloseButton />
					<CustomModalBody>{reminder.message}</CustomModalBody>
				</ModalContent>
			</Modal>
		</>
	);
};

export default ReminderModal;
