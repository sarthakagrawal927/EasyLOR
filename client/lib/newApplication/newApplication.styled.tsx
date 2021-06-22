import styled from "styled-components";
import { font, colors } from "../../utils/styles";
import { Container, Button, Textarea, FormLabel, Input, Heading } from "@chakra-ui/react";

const height = "3rem";

export const ApplicationFormContainer = styled(Container)`
	margin-top: 3rem;
	max-width: 70%;
	text-align: left;
	font-family: ${font.body};
`;

export const ApplicationHeading = styled(Heading)`
	font-family: ${font.body};
	margin: 0rem;
	font-size: 2.5rem;

	font-weight: 400;
`;

export const BigTextarea = styled(Textarea)`
	height: 30vh !important;
	::placeholder {
		font-size: 0.8rem;
	}
`;

export const ApplicationFormLabel = styled(FormLabel)`
	font-size: 1rem !important;
	margin-bottom: -0.03rem !important;
	padding-top: 1rem;
`;

export const ApplicationFormInput = styled(Input)`
	height: ${height} !important;
	::placeholder {
		font-size: 0.8rem;
	}
`;

export const ConfirmButton = styled(Button)`
	background: ${colors.gray} !important;
	::after {
		border-style: none;
	}
`;

export const IconSpan = styled.span`
	display: inline-block;
	padding: 0 1rem;
	:hover {
		cursor: pointer;
	}
`;

export const IconLabel = styled(FormLabel)`
	width: fit-content;
`;
