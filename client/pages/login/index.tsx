import { FC } from "react";
import {
    FormControl,
    FormLabel,
    Input,
    Button,
    Heading,
} from "@chakra-ui/react";
import { LoginForm, LoginContainer, LoginFormContainer } from "./login.styled";
const Login: FC = () => {
    return (
        <LoginContainer>
            <LoginFormContainer variant='shadow'>
                <Heading>Login</Heading>
                <LoginForm>
                    <FormControl id='email'>
                        <FormLabel>Email ID</FormLabel>
                        <Input type='email' />
                    </FormControl>
                    <FormControl id='password'>
                        <FormLabel>Password</FormLabel>
                        <Input type='password' />
                    </FormControl>
                    <Button variant='solid' type='submit'>
                        Login
                    </Button>
                </LoginForm>
            </LoginFormContainer>
        </LoginContainer>
    );
};
export default Login;
