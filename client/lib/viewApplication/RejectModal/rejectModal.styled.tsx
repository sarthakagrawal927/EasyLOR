import styled from "styled-components";
import { Button, Box, ModalHeader, ModalBody } from "@chakra-ui/react";
import { colors } from "utils/styles";

export const RejectButton = styled(Button)`
	height: 5vh !important;

	font-size: 14px !important;
	background-color: ${colors.peach} !important;
`;

export const CustomModalHeader = styled(ModalHeader)`
	background-color: ${colors.lightGray};
	border-radius: 0.5rem 0.5rem 0 0;
`;

export const CustomModalBody = styled(ModalBody)`
	padding: 20px 40px !important;
`;

export const ButtonContainer = styled(Box)`
	display: flex;
	flex-direction: row;
	justify-content: flex-end;

	margin: 15px 0 10px 0;
`;

export const SendButton = styled(Button)`
	height: 5vh !important;
	font-size: 14px !important;
`;
