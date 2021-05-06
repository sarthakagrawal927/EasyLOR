import { FC } from "react";
import {
    FormControl,
    FormLabel,
    Input,
    Heading,
    FormErrorMessage,
} from "@chakra-ui/react";
import {
    LoginForm,
    LoginContainer,
    LoginFormContainer,
    LoginButton,
} from "./login.styled";
import { useLogin } from "./hooks";
const Login: FC = () => {
    const {
        handleSubmit,
        emailRegister,
        passwordRegister,
        errors,
    } = useLogin();
    return (
        <LoginContainer>
            <LoginFormContainer variant='shadow'>
                <Heading>Login</Heading>
                <LoginForm onSubmit={handleSubmit}>
                    <FormControl id='email'>
                        <FormLabel>Email ID</FormLabel>
                        <Input
                            name={emailRegister?.name}
                            type='email'
                            ref={emailRegister?.ref}
                            onChange={emailRegister?.onChange}
                        />
                        {errors.email && (
                            <FormErrorMessage>{errors.email}</FormErrorMessage>
                        )}
                    </FormControl>
                    <FormControl id='password'>
                        <FormLabel>Password</FormLabel>
                        <Input
                            name={passwordRegister?.name}
                            type='password'
                            ref={passwordRegister?.ref}
                            onChange={passwordRegister?.onChange}
                        />
                        {errors.password && (
                            <FormErrorMessage>
                                {errors.password}
                            </FormErrorMessage>
                        )}
                    </FormControl>
                    <LoginButton type='submit' variant='solid'>
                        Login
                    </LoginButton>
                </LoginForm>
            </LoginFormContainer>
        </LoginContainer>
    );
};
export default Login;
