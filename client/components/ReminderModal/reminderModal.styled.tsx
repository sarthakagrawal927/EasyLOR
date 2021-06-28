import styled from "styled-components";
import { Button, ModalHeader } from "@chakra-ui/react";
import { colors } from "utils/styles";

export const ViewButton = styled(Button)`
	height: 5vh !important;
	font-size: 14px !important;
`;

export const CustomModalHeader = styled(ModalHeader)`
	background-color: ${colors.lightGray};
	border-radius: 0.5rem 0.5rem 0 0;
`;

export const CloseButton = styled(Button)`
	height: 5vh !important;
	font-size: 14px !important;
`;
