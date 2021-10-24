import styled from "styled-components";
import { Table, Box, Td, Button, PopoverHeader, FormLabel, PopoverContent } from "@chakra-ui/react";
import { colors } from "../../../utils/styles";

export const Container = styled(Box)`
	margin: 10vh auto 0 auto;
	width: 90vw;
`;

export const AdminDashboardTable = styled(Table)`
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
	}

	& a {
		text-transform: uppercase;
		color: blue;
	}
`;

export const UserTableCell = styled(Td)`
	max-width: 15vw;
	text-align: left !important;
`;

export const BranchText = styled.p`
	color: ${colors.darkGrey};
`;

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
