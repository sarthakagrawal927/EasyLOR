import { useContext, useEffect, useState } from "react";
import {
	User,
	Reminder,
	useGetRemindersByStudentIdQuery,
	useUpdateReminderMutation,
	useDeleteReminderMutation,
} from "entities/types.graphql";
import { createStandaloneToast } from "@chakra-ui/react";
import { StudentContext } from "context/student";

type RemindersReturn = {
	user: User;
	reminders: Reminder[] | null;
	loading: boolean;
	onDelete: ({}: Reminder) => void;
	onUpdate: ({}: Reminder) => void;
};

export const useReminders = (): RemindersReturn => {
	const toast = createStandaloneToast();
	const [reminders, setReminders] = useState<Reminder[] | null>([]);

	const { student } = useContext(StudentContext);

	const { data, loading } = useGetRemindersByStudentIdQuery({
		variables: {
			id: student?.user.id,
		},
		onError: error => {
			console.log(error);
			toast({
				title: "FAILED",
				description: error.message,
				status: "error",
				duration: 3000,
				position: "top",
				isClosable: true,
			});
		},
	});

	useEffect(() => {
		setReminders(data?.getRemindersByStudentID);
	}, [data]);

	const [updateReminderMutation] = useUpdateReminderMutation({
		onError: error => {
			console.log(error);
		},
		onCompleted: () => {
			// show on UI
			console.log("updated");
		},
	});

	const onUpdate = async (reminder: Reminder) => {
		try {
			const { data } = await updateReminderMutation({
				variables: {
					updateReminderInput: {
						id: reminder.id,
						viewed: true,
					},
				},
			});
		} catch (error) {
			console.error(error);
		}
	};

	const [deleteReminderMutation] = useDeleteReminderMutation({
		onError: error => {
			console.log(error);
		},
		onCompleted: () => {
			// show on UI
			console.log("deleted");
		},
	});

	const onDelete = async (reminder: Reminder) => {
		try {
			setReminders(reminders.filter(rem => rem.id !== reminder.id));
			const { data } = await deleteReminderMutation({
				variables: {
					id: reminder.id,
				},
				optimisticResponse: {
					deleteReminder: {
						id: reminder.id,
						message: reminder.message,
						viewed: reminder.viewed,
						facultyID: reminder.facultyID,
						studentID: reminder.studentID,
					},
				},
			});
		} catch (error) {
			console.error(error);
		}
	};

	return {
		user: student?.user,
		reminders,
		loading,
		onDelete,
		onUpdate,
	};
};
