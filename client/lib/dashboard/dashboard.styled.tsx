import styled from "styled-components";
import { Table, Box, Center } from "@chakra-ui/react";
import { colors, font } from "../../utils/styles";

export const DashboardContainer = styled(Center)`
	width: 100vw;
	max-width: 100%;
`;

export const Container = styled(Box)`
	margin-top: 20vh;
	width: 75vw;
	height: 100%;
	& h2 {
		font-family: ${font.body};
		font-size: 2.5rem;
		margin-bottom: 1rem;
	}
`;

export const DashboardTable = styled(Table)`
	text-align: center;
	flex-direction: column;

	& th {
		padding: 1rem 3rem;
		text-align: center;
		font-size: 1.2rem;
		border-style: groove;
		border-width: 1px;
		border-color: ${colors.gray};
		background: ${colors.lightGray};
	}

	& td {
		padding: 1rem 3rem;
		text-align: center;
		font-size: 1.35rem;
		border-style: groove;
		border-width: 1px;
		border-color: ${colors.gray};

		& span {
			font-size: 0.8rem;
			color: white;
			padding: 0.65rem 2.5rem;
			border-radius: 1rem;
			font-weight: 800;
		}
	}

	& button {
		font-size: 0.9rem;
		font-weight: 800;
		padding: 0.4rem 2.3rem;
		border-radius: 0.5rem;
		color: ${colors.blue};
		border-style: groove;
		border-width: 1px;
		border-color: ${colors.blue};
	}

	.red {
		background: #e34f3bbf;
	}
	.green {
		background: #01df86bf;
	}
	.blue {
		background: #1ccff6bf;
	}
	.blue:hover {
		cursor: pointer;
	}
`;
