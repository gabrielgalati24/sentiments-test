import { useForm, zodResolver } from "@mantine/form";
import {
    TextInput,
    Button,

    PasswordInput,
    Center,

} from "@mantine/core";
import styled from "@emotion/styled";
import { z } from "zod";
import { useLocation } from "wouter";
import { useState } from "react";
import { login } from "../utils/auth"

const schema = z.object({
    username: z.string().min(1, "This field can't be empty"),
    password: z.string().min(1, "This field can't be empty"),
});

const LoginPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [, setLocation] = useLocation();
    const form = useForm({
        validate: zodResolver(schema),
        initialValues: {
            username: "",
            password: "",
        },
    });

    const handleOnLogin = async (values: unknown) => {
        setIsLoading(true);
        const res: any = await login(values);
        setIsLoading(false);
        console.log(res);
        if (res.status === 200) {
            setLocation("/");
        }
    };
    return (
        <ContentMain>
            <form onSubmit={form.onSubmit((values: unknown) => handleOnLogin(values))}>
                <TextInput
                    withAsterisk
                    label="Username"
                    placeholder="Username"
                    {...form.getInputProps("username")}
                />
                <PasswordInput
                    placeholder="Password"
                    label="Password"
                    withAsterisk
                    mt="sm"
                    {...form.getInputProps("password")}
                />

                <Center mt="lg">
                    <Button fullWidth type="submit" loading={isLoading}>
                        {isLoading ? "Loading..." : "Login"}
                    </Button>
                </Center>
                <a onClick={() => setLocation("/register")}>
                    Don't have an account? Register here.
                </a>
            </form>

        </ContentMain>
    );
};

export default LoginPage;
const ContentMain = styled("div")`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  a {
    color: #666;
    cursor: pointer;
    font-size: 12px;
    text-decoration: underline;
    margin-top: 10px;
  }
`;
