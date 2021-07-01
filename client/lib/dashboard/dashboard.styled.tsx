import styled from "styled-components";
import { Table, Box, Center, Button } from "@chakra-ui/react";
import { colors, font } from "../../utils/styles";

export const DashboardContainer = styled(Center)`
	width: 100vw;
	max-width: 100%;
`;

export const Container = styled(Box)`
	margin-top: 5vh;
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
		text-transform: none;
	}

	& td {
		padding: 1rem 3rem;
		text-align: center;
		font-size: 1.35rem;
		border-style: groove;
		border-width: 1px;
		border-color: ${colors.gray};

		& span {
			font-size: 0.7rem;
			padding: 0.45rem 1.8rem;
			border-radius: 0.2rem;
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
`;

export const AvatarContainer = styled(Center)`
	margin-bottom: 3rem;
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

export const StyledStatus = styled.span`
	margin-left: 30vw !important;
	font-size: 1rem;
	padding: 0.45rem 1.8rem;
	border-radius: 0.2rem;
	font-weight: 800;
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
`;
