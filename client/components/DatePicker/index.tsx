import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const DueDatePicker = ({ setDateString }) => {
	const [startDate, setStartDate] = useState(null);
	return (
		<DatePicker
			minDate={new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000)}
			selected={startDate}
			onChange={(date: Date) => {
				setStartDate(date);
				let dateISO = date.toISOString();
				setDateString(dateISO);
			}}
		/>
	);
};
