import styled from "styled-components";
import { Avatar, Button, Center, Flex, Grid, Heading, Text } from "@chakra-ui/react";
import { font, colors } from "../../utils/styles";

export const Container = styled(Center)`
	width: 100%;
	height: 100vh;
	max-width: 100vw;
`;

export const ProfileContainer = styled(Flex)`
	width: 75vw;
	min-width: 600px;
	height: 90vh;
	flex-direction: column;
	justify-content: space-between;
	padding: 20px;
`;

export const ProfileDetails = styled(Flex)`
	flex-direction: row;
	width: 100%;
	height: 49%;
	padding: 20px;
`;

export const ProfilePhoto = styled(Flex)`
	flex-direction: column;
	width: 25%;
	align-items: center;
	justify-content: space-around;
`;

export const ProfileInfo = styled(Flex)`
	width: 75%;
	flex-direction: column;
	justify-content: space-evenly;
`;
export const ProfileForm = styled.form`
	width: 100%;
	height: 49%;
	padding: 20px;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
`;

export const TestScoresContainer = styled(Flex)`
	flex-direction: column;
	width: 100%;
`;

export const ContainerLeft = styled(Grid)`
	width: 45%;
	height: 100%;
`;

export const ContainerRight = styled(Flex)`
	width: 45%;
	height: 90%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;

export const ProfileHeading = styled(Heading)`
	font-family: ${font.body};
	font-size: ${font.size.heading}!important;
	width: fit-content;
`;

export const ProfileAvatar = styled(Avatar)`
	width: 50% !important;
	height: 50% !important;
`;

export const TestScoresFieldContainer = styled(Grid)`
	width: 100%;
	grid-template-columns: 1fr 1fr 1fr;
	grid-gap: 1em;
`;
export const InfoFieldContainer = styled(Flex)`
	width: 80%;
`;

export const InfoField = styled(Flex)`
	flex-direction: column;
	width: 50%;
	height: 30%;
`;

export const InfoFieldLabel = styled.label`
	font-size: ${font.size.caption};
`;

export const InfoFieldText = styled(Text)`
	font-size: ${font.size.subHeading};
	font-weight: 600;
	color: ${colors.blue};
	letter-spacing: 1px;
`;

export const Attach = styled(Text)`
	cursor: pointer;
	text-transform: uppercase !important;
	color: ${colors.blue};
	margin-top: 10px;
	font-family: ${font.body};
	letter-spacing: 2px;
`;

export const SaveButton = styled(Button)`
	width: 50% !important;
	&:hover {
		filter: brightness(0.9);
	}
`;

export const AppliedUniversities = styled(Flex)`
	width: 100%;
	flex-direction: column;
	grid-area: applied-universities;
`;

export const AppliedUniversitiesList = styled(Flex)`
	margin-top: 1em;
	color: ${colors.blue};
	font-size: 1.1rem;
`;

export const TestScoresAdditionalContainer = styled(Flex)`
	width: 100%;
	flex-direction: column;
	justify-content: space-between;
	grid-area: test-scores;
`;
export const TestScoresAdditionalFieldContainer = styled(Flex)`
	width: 100%;
	height: 70%;
	flex-direction: column;
`;
export const TestScore = styled(Flex)`
	height: 30%;
	width: 60%;
	justify-content: space-between;
`;

export const AcceptedUniversity = styled(Flex)`
	flex-direction: column;
	grid-area: accepted-university;
	height: 50%;
`;
export const ProofOfAcceptance = styled(Flex)`
	flex-direction: column;
	grid-area: proof-of-acceptance;
	height: 50%;
`;

export const ProfileAdditionalDetailsContainer = styled(Grid)`
	width: 100%;
	height: 40%;
	margin-top: 4em;
	grid-template-columns: 1fr 1fr;
	grid-template-rows: 1fr 1fr 1fr 1fr;
	grid-template-areas:
		"applied-universities test-scores"
		"accepted-university test-scores"
		"accepted-university proof-of-acceptance"
		"accepted-university proof-of-acceptance";
	grid-gap: 2em;
	column-gap: 8em;
`;
