import { Box, Button, Input, Stack, Text } from "@chakra-ui/react";
import { FC, useState } from "react";
import { setCookies } from "cookies-next";
import { useRouter } from "next/router";

import { fetchData } from "../../../src/helpers/fetchData";

export const Login: FC = () => {
  const [loading, setLoading] = useState(false);
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [errorSubmit, setErrorSubmit] = useState(false);
  const router = useRouter();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputPassword(e.target.value);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setErrorSubmit(false);

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: inputEmail,
        password: inputPassword,
      }),
    };

    const data = await fetchData(`/api/v1/auth/login`, options);

    if (data?.ok) {
      setCookies("token", data.data, { maxAge: 60 * 60 * 24, secure: true });
      router.push("/admin/dashboard");
    } else {
      console.info(data);
      setErrorSubmit(true);
    }

    setLoading(false);
  };

  return (
    <Stack
      gridColumnStart={6}
      gridColumnEnd={8}
      gridRowStart={2}
      spacing={6}
      width={{ lg: "auto", md: "70%" }}
      margin={"0 auto"}
    >
      <Box>
        <Text fontSize={{ lg: 28, md: 16 }} textAlign={{ lg: "end", md: "start" }}>
          ¿Sos Dios? ¿Sos admin?
        </Text>
        <Text fontSize={{ lg: 28, md: 16 }} textAlign={{ lg: "end", md: "start" }}>
          ¿está chequeado?
        </Text>
      </Box>

      <Stack spacing={4}>
        <Input
          type={"text"}
          placeholder="email"
          _placeholder={{ color: "gray.500" }}
          borderColor={"primary.500"}
          name="email"
          id="email"
          onChange={handleEmailChange}
        />
        <Input
          type={"password"}
          placeholder="contraseña"
          _placeholder={{ color: "gray.500" }}
          borderColor={"primary.500"}
          name="password"
          id="password"
          onChange={handlePasswordChange}
          onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
        />
        <Button
          isLoading={loading}
          loadingText="Loading"
          colorScheme={"buttons"}
          variant="outline"
          spinnerPlacement="start"
          onClick={handleSubmit}
          onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
          type="submit"
        >
          Submit
        </Button>
        {errorSubmit && <Text color={"red.500"}>Usuario o contraseña incorrectos</Text>}
      </Stack>
    </Stack>
  );
};
