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
import { register } from "../utils/auth"

const schema = z.object({
    username: z.string().min(1, "This field can't be empty"),
    password: z.string().min(1, "This field can't be empty"),
    email: z.string()
        .min(1, { message: "Este campo debe ser llenado." })
        .email("Esto no es un correo electrónico válido.")

});

const RegisterPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [, setLocation] = useLocation();
    const form = useForm({
        validate: zodResolver(schema),
        initialValues: {
            username: "",
            password: "",
            email: "",
        },
    });

    const handleOnRegister = async (values: unknown) => {
        setIsLoading(true);
        const res = await register(values);
        setIsLoading(false);
        if (res.status === 201) {
            setLocation("/login");
        }
        console.log(res);

    };
    return (
        <ContentMain>
            <form onSubmit={form.onSubmit((values: unknown) => handleOnRegister(values))}>
                <TextInput
                    withAsterisk
                    label="Username"
                    placeholder="Username"
                    {...form.getInputProps("username")}
                />
                <TextInput
                    withAsterisk
                    label="Email"
                    placeholder="Email"
                    {...form.getInputProps("email")}
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
                        {isLoading ? "Register..." : "Register"}
                    </Button>
                </Center>
                <a onClick={() => setLocation("/login")}>
                    you have an account?
                </a>
            </form>

        </ContentMain>
    );
};

export default RegisterPage;
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
