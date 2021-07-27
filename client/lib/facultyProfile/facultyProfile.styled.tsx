import styled from "styled-components";
import { font, colors, shadow } from "../../utils/styles";
import { Avatar, Button, Center, Flex, Grid, Heading, Text } from "@chakra-ui/react";

export const Container = styled(Flex)`
	width: 100vw;
	height: 80vh;
	flex-direction: column;
	max-width: 100vw;
	align-items: center;
	justify-content: space-around;
`;
export const ProfilePhotoContainer = styled(Flex)`
	flex-direction: column;
	width: 30%;
	align-items: center;
	justify-content: space-around;
	height: 100%;
	font-size: ${font.size.heading};
`;

export const ProfileHeading = styled(Heading)`
	font-family: ${font.body};
	font-size: ${font.size.heading} !important;
`;

export const ProfileAvatar = styled(Avatar)`
	scale: 1.4;
	box-shadow: ${shadow.containerShadow};
`;

export const TopContainer = styled(Flex)`
	flex-direction: row;
	align-items: center;
	width: 50%;
	height: 45%;
`;

export const DetailsContainer = styled(Grid)`
	grid-template-columns: 1fr 1fr;
	grid-column-gap: 5em;
	grid-row-gap: 3em;
	width: 45%;
`;

export const ProfileDetail = styled(Flex)`
	flex-direction: column;
`;

export const DetailProperty = styled(Text)`
	font-size: ${font.size.caption};
	color: ${colors.darkGrey};
`;

export const DetailValue = styled(Text)`
	font-size: ${font.size.subHeading};
`;

export const UploadDraftButton = styled(Button)`
	&:hover {
		filter: brightness(0.9);
	}
`;

export const DraftContainer = styled(Flex)`
	width: 70%;
	height: 40%;
	margin-top: 5em;
	padding-left: 5em;
	flex-direction: column;
	justify-content: center;
`;
