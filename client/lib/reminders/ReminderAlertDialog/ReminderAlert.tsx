import { FC, useRef } from "react";
import {
	useDisclosure,
	AlertDialog,
	AlertDialogBody,
	AlertDialogFooter,
	AlertDialogContent,
	AlertDialogOverlay,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { CustomAlertDialogHeader, CancelButton, DeleteButton } from "./ReminderAlert.styled";

type ReminderAlertProps = {
	onDelete: () => void;
};

const ReminderAlert: FC<ReminderAlertProps> = ({ onDelete }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const cancelRef = useRef();

	return (
		<>
			<CloseIcon onClick={onOpen} cursor="pointer" />
			<AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
				<AlertDialogOverlay>
					<AlertDialogContent>
						<CustomAlertDialogHeader fontSize="lg" fontWeight="bold">
							Delete Reminder
						</CustomAlertDialogHeader>

						<AlertDialogBody>Are you sure? It cannot be undone.</AlertDialogBody>

						<AlertDialogFooter>
							<CancelButton ref={cancelRef} onClick={onClose} variant="solid">
								Cancel
							</CancelButton>
							<DeleteButton
								onClick={() => {
									onClose();
									onDelete();
								}}
								ml={3}
								variant="solid"
							>
								Delete
							</DeleteButton>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialogOverlay>
			</AlertDialog>
		</>
	);
};

export default ReminderAlert;
