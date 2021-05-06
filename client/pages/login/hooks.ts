import {
    useForm,
    UseFormRegisterReturn,
    FieldError,
    DeepMap,
} from "react-hook-form";
import { createStandaloneToast } from "@chakra-ui/react";
import { useLoginUserMutation } from "entities/types.graphql";

type UseLoginReturn = {
    emailRegister: UseFormRegisterReturn;
    passwordRegister: UseFormRegisterReturn;
    errors: DeepMap<LoginFormInputs, FieldError>;
    handleSubmit: (
        e?: React.BaseSyntheticEvent<object, any, any>
    ) => Promise<void>;
};

type LoginFormInputs = {
    email: string;
    password: string;
};

export const useLogin = (): UseLoginReturn => {
    const defaultLoginValues = {
        email: "",
        password: "",
    };
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormInputs>({
        defaultValues: defaultLoginValues,
    });

    const emailRegister = register("email", {
        required: true,
        minLength: 5,
        maxLength: 50,
    });
    const passwordRegister = register("password", {
        required: true,
        minLength: 5,
        maxLength: 50,
    });
    const toast = createStandaloneToast();

    const [loginUserMutation] = useLoginUserMutation();

    const onSubmit = handleSubmit(async (data: LoginFormInputs) => {
        console.log("Logging In...: ", data);
        try {
            const { data: response, errors } = await loginUserMutation({
                variables: {
                    loginUserInput: data,
                },
            });
            if (errors) {
                throw new Error(errors[0].extensions["errors"]);
            }

            if (data) {
                console.log("LOGIN SUCCESSFUL: ", response.loginUser);
                toast({
                    title: "Login Successful",
                    description: "Welcome to EasyLOR",
                    status: "success",
                    duration: 5000,
                    position: "top",
                    isClosable: true,
                });
            }
        } catch (errors) {
            toast({
                title: "Login Failed",
                description: "Please try again!",
                status: "error",
                duration: 5000,
                position: "top",
                isClosable: true,
            });
            console.log(errors);
        }
    });

    return {
        emailRegister,
        passwordRegister,
        errors,
        handleSubmit: onSubmit,
    };
};
