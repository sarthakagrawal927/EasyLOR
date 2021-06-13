import styled from "styled-components";
import { Box, Center, Button } from "@chakra-ui/react";
import { shadow, colors, font } from "../../utils/styles";
import { Container } from "lib/dashboard/dashboard.styled";

export const RegisterContainer = styled(Center)`
	width: 100vw;
	height: 100vh;
	max-width: 100vw;
`;

export const RegisterFormContainer = styled(Box)`
	width: 40%;
	min-height: 600px;
	min-width: 500px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	height: 70%;
	background-color: white;
	& h2 {
		padding-inline: 2em;
		font-family: ${font.body};
		font-size: 2.5rem;
	}
	& form {
		margin: 0 auto;
	}
	& a {
		margin: 20px auto 0 auto;
		color: ${colors.blue};
	}
	box-shadow: ${shadow.containerShadow};
`;

export const RegisterForm = styled.form`
	width: 30vw;
	display: flex;
	flex-direction: column;
	height: 45vh;
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
		&:hover {
			filter: brightness(0.9);
		}
	}
`;

export const RegisterFieldContainer = styled(Container)`
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	height: max-content;
	margin-top: 1em;
	& div {
		width: 45%;
	}
`;
export const RegisterFieldSubContainer = styled(Container)`
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 80%;
	height: max-content;
	margin-top: 2em;
	& div {
		width: 45%;
	}
`;
export const RegisterButton = styled(Button)`
	height: 60px !important;
	margin-top: 3em;
`;
