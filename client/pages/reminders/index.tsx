import { FC } from "react";
import NavBar from "components/NavBar/NavBar";
import { useReminders } from "lib/reminders/hooks";
import {
	TitleContainer,
	Container,
	ReminderContainer,
	FacultyContainer,
	MessageContainer,
	NameContainer,
	ButtonsContainer,
	CloseButtonContainer,
} from "lib/reminders/reminders.styled";
import { Heading } from "@chakra-ui/react";
import ReminderModal from "lib/reminders/ReminderModal/ReminderModal";
import ReminderAlert from "lib/reminders/ReminderAlertDialog/ReminderAlert";

const Reminders: FC = () => {
	const { user, reminders, loading, onDelete, onUpdate } = useReminders();

	return (
		<>
			<NavBar user={user} />
			<TitleContainer>
				<Heading as="h2">Your Reminders</Heading>
			</TitleContainer>
			<Container>
				{loading && "Loading..."}
				{reminders?.length === 0 && "No Reminders :)"}
				{reminders?.map(reminder => (
					<ReminderContainer key={reminder.id}>
						<FacultyContainer>
							<Heading as="h6">Faculty</Heading>
							<Heading as="h3">{reminder.faculty.user.firstName + " " + reminder.faculty.user.lastName}</Heading>
						</FacultyContainer>
						<MessageContainer>
							<Heading as="h6">Message</Heading>
							<NameContainer>
								{reminder.message.length < 40 ? reminder.message : reminder.message.substring(0, 37) + "..."}
							</NameContainer>
						</MessageContainer>
						<ButtonsContainer>
							<ReminderModal reminder={reminder} onUpdate={() => !reminder.viewed && onUpdate(reminder)} />
						</ButtonsContainer>
						<CloseButtonContainer>
							<ReminderAlert onDelete={() => onDelete(reminder)} />
						</CloseButtonContainer>
					</ReminderContainer>
				))}
			</Container>
		</>
	);
};

export default Reminders;
