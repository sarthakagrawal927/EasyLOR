import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { DeleteIcon } from "@chakra-ui/icons";
import { IconSpan } from "lib/newApplication/newApplication.styled";

export const DueDatePicker = ({ setDateString, initialState = null }) => {
	const [startDate, setStartDate] = useState(initialState);
	const clearDate = () => {
		setStartDate(null);
		setDateString(null);
	};
	return (
		<>
			<DatePicker
				minDate={new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000)}
				selected={startDate}
				onChange={(date: Date) => {
					setStartDate(date);
					let dateISO = date?.toISOString();
					setDateString(dateISO);
				}}
				dateFormat="dd-MM-yyyy"
			/>
			{startDate && (
				<IconSpan>
					<DeleteIcon onClick={clearDate} w={6} h={6} color="red" />
				</IconSpan>
			)}
		</>
	);
};
