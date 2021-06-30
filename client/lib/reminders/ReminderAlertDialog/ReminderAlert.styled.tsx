import styled from "styled-components";
import { Button, AlertDialogHeader } from "@chakra-ui/react";
import { colors } from "utils/styles";

export const CustomAlertDialogHeader = styled(AlertDialogHeader)`
	background-color: ${colors.lightGray};
	border-radius: 0.5rem 0.5rem 0 0;
`;

export const CancelButton = styled(Button)`
	height: 5vh !important;
	font-size: 14px !important;

	color: white !important;
	background-color: ${colors.gray} !important;
`;

export const DeleteButton = styled(Button)`
	height: 5vh !important;
	font-size: 14px !important;

	color: white !important;
	background-color: ${colors.red} !important;
`;
