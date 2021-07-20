import styled from "styled-components";
import { Button, Box, ModalHeader, ModalBody, Center } from "@chakra-ui/react";
import { colors } from "utils/styles";

export const UploadButton = styled(Button)`
	height: 5vh !important;
	font-size: 14px !important;
	background-color: ${colors.aqua} !important;

	margin-left: 20px;
`;

export const CustomModalHeader = styled(ModalHeader)`
	background-color: ${colors.lightGray};
	border-radius: 0.5rem 0.5rem 0 0;
`;

export const CustomModalBody = styled(ModalBody)`
	padding: 20px 40px !important;
`;

export const ButtonContainer = styled(Center)`
	margin: 50px 0;
`;

export const SendButton = styled(Button)`
	height: 5vh !important;
	font-size: 14px !important;
`;
