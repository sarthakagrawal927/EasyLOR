import styled from "styled-components";
import { Box, Center, Button } from "@chakra-ui/react";
import { AttachmentIcon } from "@chakra-ui/icons";
import { font, colors } from "../../utils/styles";

const elementPadding = "15px";

export const ViewApplicationContainer = styled(Box)`
	width: 100vw;
	max-width: 100%;
	height: 100%;

	display: flex;
	flex-direction: column;
	justify-content: flex-end;

	font-family: ${font.body};
	font-size: 18px;

	padding: 0 22vw;
`;

export const TitleContainer = styled(Box)`
	display: flex;
	flex-direction: row;
	justify-content: flex-start;

	& h2 {
		font-family: ${font.body};
		font-size: 5vh;
		font-weight: 400;

		margin: 8vh 0 5vh 0;
	}
`;

export const ViewAppHeading = styled.span`
	font-weight: 600;
`;

export const ViewAppDetail = styled.span`
	font-weight: 400;
`;

export const ProfileContainer = styled(Box)`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
`;

export const DetailsContainer = styled(Box)`
	width: 70%;

	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;

export const DetailsRow1Container = styled(Box)`
	position: relative;
	width: 100%;

	display: flex;
	flex-direction: row;
	justify-content: flex-start;
`;

export const Detailscolumn1Container = styled(Box)`
	display: flex;
	flex-direction: column;
	justify-content: space-between;

	& div {
		padding-bottom: ${elementPadding};
	}
`;
export const Detailscolumn2Container = styled(Box)`
	display: flex;
	flex-direction: column;
	justify-content: space-between;

	& div {
		padding: 0 0 ${elementPadding} 4vw;
	}
`;

export const DetailsRow2Container = styled(Box)`
	position: relative;
	width: 100%;

	display: flex;
	flex-direction: column;
	justify-content: space-between;

	& div {
		padding-bottom: ${elementPadding};
	}
`;

export const ImageContainer = styled(Center)`
	width: 30%;
`;

export const DownloadText = styled.span`
	color: ${colors.darkGrey} !important;
	font-size: 13px !important;
	cursor: pointer;

	margin-left: 5px;
`;

export const DraftContainer = styled(Box)`
	padding-bottom: ${elementPadding};
`;

export const DraftIcon = styled(AttachmentIcon)`
	color: ${colors.aqua} !important;
`;

export const StatementOfPurposeContainer = styled(Box)``;

export const SOPDetail = styled(Box)`
	text-align: justify;
	white-space: pre-wrap;
	max-height: 30vh;
	overflow-y: auto;
	margin-top: ${elementPadding};
`;

export const ButtonsContainer = styled(Box)`
	display: flex;
	flex-direction: row;
	justify-content: flex-end;

	padding-top: 5vh;
`;

export const UploadButton = styled(Button)`
	height: 5vh !important;
	font-size: 14px !important;
	background-color: ${colors.aqua} !important;

	margin-left: 20px;
`;
