import { Button, Stack } from "@chakra-ui/react";
import { HomeContainer } from "./home.styled";
import { FC } from "react";
import Link from "next/link";
const Home: FC = () => {
    return (
        <HomeContainer>
            <Stack spacing={6} direction='row' align='center'>
                <Link href='/login'>
                    <Button variant='solid'>Login</Button>
                </Link>
                <Link href='/register'>
                    <Button variant='outline'>Register</Button>
                </Link>
            </Stack>
        </HomeContainer>
    );
};

export default Home;
