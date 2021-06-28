import styled from "styled-components";
import { Box, Center, Button } from "@chakra-ui/react";
import { shadow, font, colors } from "../../utils/styles";

const reminderHeight = "128px";
const elementPadding = "15px";

export const TitleContainer = styled(Box)`
	& h2 {
		font-family: ${font.body};
		font-size: 5vh;
		font-weight: 600;

		margin: 5vh;
		padding-left: 10vw;
	}
`;

export const Container = styled(Center)`
	width: 100vw;
	max-width: 100%;
	height: 100%;

	display: flex;
	flex-direction: column;
	justify-content: space-between;
	overflow: hidden;
`;

export const ReminderContainer = styled(Box)`
	min-height: ${reminderHeight};
	min-width: 50vw;

	display: flex;
	flex-direction: row;
	justify-content: space-between;
	overflow: hidden;

	font-family: ${font.body};
	color: ${colors.darkGrey};

	margin-bottom: 2vh;

	background-color: white;
	border-radius: 0.5rem;

	box-shadow: ${shadow.containerShadow};

	& h3,
	h6 {
		font-family: ${font.body};
		font-weight: 600;
	}

	& h3 {
		font-size: 24px;
		color: ${colors.darkGrey};
	}

	& h6 {
		font-size: 18px;
		color: ${colors.blue};

		padding-top: 1vh;
	}
`;

export const FacultyContainer = styled(Box)`
	position: relative;
	height: ${reminderHeight};
	width: 35%;

	padding: ${elementPadding};
	padding-left: 3vw;

	& h3 {
		padding-top: 2vh;
	}

	& h6 {
		padding-top: 1vh;
	}
`;
export const MessageContainer = styled(Box)`
	position: relative;
	height: ${reminderHeight};
	width: 45%;

	padding: ${elementPadding};
`;

export const NameContainer = styled(Box)`
	padding-top: 2vh;
`;

export const ButtonsContainer = styled(Box)`
	position: relative;
	height: ${reminderHeight};
	width: 15%;
	min-width: fit-content;

	display: flex;
	flex-direction: column;
	justify-content: center;

	padding: ${elementPadding};
`;

export const CloseButtonContainer = styled(Box)`
	position: relative;
	height: ${reminderHeight};
	width: 5%;
	min-width: fit-content;

	display: flex;
	flex-direction: column;
	justify-content: flex-start;

	padding: ${elementPadding};
`;
