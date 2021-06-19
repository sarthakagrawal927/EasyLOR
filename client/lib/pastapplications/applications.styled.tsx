import styled from "styled-components";
import { Box, Center } from "@chakra-ui/react";
import { shadow, font } from "../../utils/styles";

const pastAppHeight = "24vh";
const headingWeight = "700";
const headingSize = "18px";
const sideHeaderSize = "18px";
const elementPadding = "15px";

export const ApplicationContainer = styled(Center)`
	width: 100vw;
	max-width: 100%;
	height: 100%;

	padding-top: 10vh;

	display: flex;
	flex-direction: column;
	justify-content: center;
`;

export const PastApplicationsContainer = styled(Box)`
	min-height: ${pastAppHeight};
	min-width: 75vw;

	display: flex;
	flex-direction: row;
	justify-content: space-around;
	overflow: hidden;

	font-family: ${font.body};
	color: #515151;

	margin-bottom: 2vh;

	background-color: white;
	border-radius: 0.5rem;

	box-shadow: ${shadow.containerShadow};

	& h3,
	h6 {
		margin: auto;
		font-family: ${font.body};
	}
`;

export const ImageNameContainer = styled(Box)`
	height: ${pastAppHeight};
	width: 20%;

	display: flex;
	flex-direction: column;
	justify-content: space-around;

	padding: ${elementPadding};

	& div {
		margin: auto;
	}

	& h6 {
		font-size: ${sideHeaderSize};
		font-weight: 600;
		text-align: center;
	}
`;

export const ProfileContainer = styled(Box)`
	min-height: ${pastAppHeight};
	width: 35%;

	display: flex;
	flex-direction: column;
	justify-content: space-around;

	font-size: ${sideHeaderSize};

	padding: ${elementPadding};
	padding-left: 3vw;

	& div,
	span {
		margin: auto 0px;
	}

	& span.past-app-profile-heading {
		font-weight: 600;
	}
`;

export const AcceptedUniversity = styled(Box)`
	height: ${pastAppHeight};
	width: 25%;
	position: relative;

	display: flex;
	flex-direction: column;
	justify-content: space-between;

	padding: ${elementPadding};

	& h3 {
		height: 70%;

		color: #0248ff;
		font-size: 24px;
		font-weight: 1000;

		padding-top: 2.5vh;
	}

	& h6 {
		height: 30%;

		color: #000000;
		font-size: ${headingSize};
		font-weight: ${headingWeight};

		padding-top: 1vh;
	}
`;

export const TestScoreContainer = styled(Box)`
	min-height: ${pastAppHeight};
	width: 20%;
	position: relative;

	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;

	padding: ${elementPadding};

	& h6 {
		height: 30%;

		color: #000000;
		font-size: ${headingSize};
		font-weight: ${headingWeight};

		padding-top: 1vh;
	}

	& div.past-app-testscore-container {
		height: 70%;

		margin: auto;

		& div.past-app-testscore {
			padding: 5px;
		}

		display: flex;
		flex-direction: column;
		justify-content: flex-start;

		font-weight: 600;
		text-align: center;
	}
`;
