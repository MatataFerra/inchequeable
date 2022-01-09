import { Text } from "@chakra-ui/react";
import { FC } from "react";

type Props = {
  state: boolean;
};

export const MessageLike: FC<Props> = ({ state }) => {
  return (
    <Text fontSize={12} fontWeight={"600"}>
      {state ? "Gracias por tu like" : "Danos tu like (no hay otra opción)"}
    </Text>
  );
};
