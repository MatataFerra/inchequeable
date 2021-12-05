import { Stack, Text } from "@chakra-ui/react";
import type { NextPage } from "next";

const Title: NextPage = () => {
  return (
    <Stack
      height={"10rem"}
      direction={"row"}
      justifyContent={"center"}
      position={"relative"}
      gridColumn={"2 / 4"}
    >
      <Text
        fontSize={78}
        as="h1"
        fontWeight={100}
        fontStyle={"italic"}
        textTransform={"uppercase"}
        position={"absolute"}
        top={"30%"}
        left={"15%"}
      >
        Inchequeable.com.ar
      </Text>
      <Text position={"absolute"} top={"95%"} left={"15%"} color={"secondary.600"}>
        andá a saber de dónde salió...
      </Text>
    </Stack>
  );
};

export default Title;
