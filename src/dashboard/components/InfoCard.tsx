import { FC } from "react";
import { Text } from "@chakra-ui/react";

import { BoxShadow } from "./BoxShadow";

interface Props {
  title: string;
  data: string | number;
}

export const InfoCard: FC<Props> = ({ title, data }) => {
  return (
    <BoxShadow
      p={4}
      w="100%"
      textAlign="center"
      display="flex"
      flexDirection="column"
      justifyContent="center"
    >
      <Text
        fontSize={{ base: "2rem", md: "2.5rem" }}
        whiteSpace="break-spaces"
        fontWeight="bold"
        color="cards.500"
      >
        {title}
      </Text>
      <Text fontWeight="bold" fontSize={{ base: "1.5rem", md: "2rem" }}>
        {data}
      </Text>
    </BoxShadow>
  );
};
