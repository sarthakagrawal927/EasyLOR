import styled from "styled-components";
import { Box, Center, Button } from "@chakra-ui/react";
import { shadow, colors, font } from "../../utils/styles";
export const LoginContainer = styled(Center)`
	width: 100vw;
	height: 100vh;
	max-width: 100vw;
`;

export const LoginFormContainer = styled(Box)`
	width: 40vw;
	display: flex;
	flex-direction: column;
	justify-content: center;
	height: 70vh;
	background-color: white;
	& h2 {
		padding-inline: 2em;
		font-family: ${font.body};
		font-size: 2.5rem;
	}
	& form {
		margin: 0 auto;
	}
	box-shadow: ${shadow.containerShadow};
`;

export const LoginForm = styled.form`
	width: 30vw;
	display: flex;
	flex-direction: column;
	height: 45vh;
	& div {
		margin-top: 2em;
	}
	& label {
		font-size: 1.2rem;
	}
	& input {
		border: 2px solid ${colors.lightGray};
		height: 3.5em;
		border-radius: 5px;
		&:focus {
			border: 2px solid ${colors.blue};
		}
	}
	& button {
		margin-top: 2.5em;
		&:hover {
			filter: brightness(0.9);
		}
	}
`;

export const LoginButton = styled(Button)`
	height: 60px;
`;
