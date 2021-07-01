import styled from "styled-components";
import { Center, Button } from "@chakra-ui/react";

export const AvatarContainer = styled(Center)`
	margin-bottom: 3rem;
`;

export const SOPContainer = styled.div`
	height: 27vh !important;
	word-wrap: break-word;
	white-space: pre-wrap;
	overflow-y: auto;
`;

export const StyledButton = styled(Button)`
	&:hover {
		filter: brightness(0.9);
	}
`;
