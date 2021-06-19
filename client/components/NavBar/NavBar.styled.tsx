import styled from "styled-components";
import { Box, Button, MenuList } from "@chakra-ui/react";
import { colors, shadow } from "../../utils/styles";

export const NavBarContainer = styled(Box)`
	width: 100vw;
	height: 10vh;
	max-width: 100%;

	display: flex;
	flex-direction: row;
	justify-content: space-between;
	overflow: hidden;

	font-size: 18px;

	padding: 1vh 3vw;

	box-shadow: ${shadow.containerShadow};
`;

export const NameContainer = styled(Box)`
	display: flex;
	justify-content: center;
	align-items: center;

	font-size: 5vh;
`;

export const RightContainer = styled(Box)`
	display: flex;
	flex-direction: row;
	justify-content: space-between;

	& div {
		padding-left: 2vw;
	}

	font-weight: 700;
`;

export const OptionsContainer = styled(Box)`
	display: flex;
	justify-content: center;
	align-items: center;

	padding: 0 5vw;
`;

export const PendingContainer = styled(Box)`
	display: flex;
	justify-content: center;
	align-items: center;

	color: ${props => (props.selected ? colors.blue : colors.gray)};
`;

export const PastContainer = styled(Box)`
	display: flex;
	justify-content: center;
	align-items: center;

	color: ${props => (props.selected ? colors.blue : colors.gray)};
`;

export const ApplicationButton = styled(Button)`
	height: 5vh !important;
	font-size: 14px !important;
`;

export const ImageContainer = styled(Box)`
	display: flex;
	justify-content: center;
	align-items: center;

	cursor: pointer;
`;

export const ProfileMenuList = styled(MenuList)`
	border-width: 0 !important;

	box-shadow: ${shadow.containerShadow} !important;
`;
