import styled from "styled-components";
import { colors, font } from "../../utils/styles";
import {
	Table,
	Box,
	Td,
	Button,
	Center,
	ModalHeader,
	ModalBody,
	PopoverHeader,
	FormLabel,
	PopoverContent,
} from "@chakra-ui/react";

// Containers
export const SmallTableContainer = styled(Box)`
	margin: 10vh auto 0 auto;
	width: 60vw;
	& h2 {
		font-family: ${font.body};
		font-size: 1.5rem;
		margin-bottom: 1rem;
	}
`;

// Main table styling
export const BigTableContainer = styled(Box)`
	margin: 10vh auto 0 auto;
	width: 90vw;
`;

export const DashboardTable = styled(Table)`
	text-align: center;
	flex-direction: column;
	& tr {
		box-shadow: 0px 4px 4px rgba(171, 171, 171, 0.25);
		border-radius: 5px;
		border-style: hidden;
	}

	& th {
		padding: 2.5rem 2rem;
		text-align: center;
		font-size: 1.2rem;
		line-height: 1.2rem;
		background-color: rgba(244, 244, 244, 0.356);
		text-transform: uppercase;
	}

	& td {
		padding: inherit 2rem;
		text-align: center;
		font-size: 1rem;
		& p {
			font-size: 1.2rem;
		}
		/* status badge */
		& span {
			font-size: 0.7rem;
			padding: 0.45rem 1.8rem;
			border-radius: 1.2rem;
			font-weight: 800;
		}
	}

	& a {
		text-transform: uppercase;
		color: blue;
	}

	.red {
		color: #b81600;
		background: rgba(234, 123, 108, 0.62);
	}

	.green {
		color: #008024;
		background: rgba(1, 223, 134, 0.5);
	}

	.blue {
		color: #0084a1;
		background: rgba(85, 219, 249, 0.53);
	}

	.blue:hover {
		cursor: pointer;
	}
	.green:hover {
		cursor: pointer;
	}
`;

export const UserTableCell = styled(Td)`
	max-width: 15vw;
	text-align: left !important;
`;

export const BranchText = styled.p`
	color: ${colors.darkGrey};
`;

// Pending  Modal Styling
export const AvatarContainer = styled(Center)`
	margin-top: -8rem;
`;

export const SOPContainer = styled.div`
	height: 27vh !important;
	word-wrap: break-word;
	overflow-y: auto;
	white-space: pre-wrap;
`;

export const StyledButton = styled(Button)`
	&:hover {
		filter: brightness(0.9);
	}
`;

export const GrayModalHeader = styled(ModalHeader)`
	background-color: ${colors.lightGray};
	border-radius: 0.4rem;
`;

// Granted Modal Styling
export const HugeHeading = styled.h1`
	font-size: 2.5rem;
	text-align: center;
`;

export const SpacedButtonLink = styled.div`
	text-align: center;
	margin: 3.5rem;
`;

export const GreenTickBox = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	padding-top: 1rem;
`;

export const GrantedModalBody = styled(ModalBody)`
	margin-top: 1.8rem;
	height: 400em;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	text-align: "center";
`;

// Admin Features Styling
export const ExportButton = styled(Button)`
	color: ${colors.darkGreen} !important;
	box-shadow: 0px 8px 24px rgba(149, 157, 165, 0.2) !important;
	border-radius: 5px !important;
	padding: 10px !important;
	background-color: white;
	width: max-content !important;
	height: 3.5em !important;
	font-size: 12px !important;
	margin-bottom: 1rem;
`;

export const CountText = styled.span`
	color: ${colors.darkGrey};
	height: 1.2rem;
	margin: 0.8rem;
`;

export const FilterPopoverHeader = styled(PopoverHeader)`
	background-color: ${colors.lightGray};
	border-radius: 0.4rem;
	border: 0;
	font-weight: 600;
	padding: 0.8rem !important;
`;

export const FilterFormLabel = styled(FormLabel)`
	width: 10vw;
	white-space: "nowrap";
	font-size: 0.6rem !important;
	margin-top: 0.5rem;
`;

export const FilterPopoverContent = styled(PopoverContent)`
	border: 0 !important;
	box-shadow: 0px 8px 24px rgba(149, 157, 165, 0.2);
`;
