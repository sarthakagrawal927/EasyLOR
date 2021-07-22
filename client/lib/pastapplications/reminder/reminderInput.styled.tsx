import styled from "styled-components";
import { Button, Box, Text } from "@chakra-ui/react";

const elementPadding = "40px";

export const ReminderContainer = styled(Box)`
	display: flex;
	flex-direction: column;
	width: 45%;

	padding: 0 ${elementPadding};
	margin: auto;
`;

export const ReminderTitle = styled(Text)`
	font-size: 18px !important;
	font-weight: 600 !important;
`;

export const ReminderBody = styled(Box)`
	width: 100%;
`;

export const ButtonContainer = styled(Box)`
	display: flex;
	flex-direction: row;
	justify-content: flex-end;

	margin: 10px 0 10px 0;
`;

export const SendButton = styled(Button)`
	height: 4vh !important;
	font-size: 12px !important;
`;
