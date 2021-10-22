import styled from "styled-components";
import { Table, Box, Td, Text } from "@chakra-ui/react";
import { colors, font } from "../../../utils/styles";

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
