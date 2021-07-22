import { FC, useRef } from "react";
import { Textarea } from "@chakra-ui/react";
import { ReminderContainer, ReminderTitle, ReminderBody, ButtonContainer, SendButton } from "./reminderInput.styled";
import { Student } from "entities/types.graphql";

type ReminderInputProps = {
	student: Student;
	getReminder: (reminder: string | null) => void;
};

const ReminderInput: FC<ReminderInputProps> = ({ student, getReminder }) => {
	const messageRef = useRef<HTMLTextAreaElement>();

	return (
		<ReminderContainer>
			<ReminderTitle>{`Send reminder to ${student.user.firstName} ${student.user.lastName}`}</ReminderTitle>
			<ReminderBody>
				<Textarea ref={messageRef} placeholder="Remind by emailing with message" marginTop="15px"></Textarea>
				<ButtonContainer>
					<SendButton variant="solid" onClick={() => getReminder(messageRef.current.value)}>
						{"SEND EMAIL"}
					</SendButton>
				</ButtonContainer>
			</ReminderBody>
		</ReminderContainer>
	);
};

export default ReminderInput;
