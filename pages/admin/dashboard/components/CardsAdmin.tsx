import { Box, HStack, Stack, Text } from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { FC } from "react";

type Props = {
  title: string;
  subtitle: string;
  order: number;
  author: string;
};

export const CardsAdmin: FC<Props> = ({ order, title, subtitle, author }) => {
  return (
    <Stack padding={2} direction={"row"} boxShadow={"0 10px 25px rgba(63, 19, 19, 0.1)"}>
      <Text> {order}. </Text>
      <Stack spacing={4} width={"100%"}>
        <Stack
          fontSize={16}
          textTransform={"capitalize"}
          direction={"row"}
          justifyContent={"space-between"}
        >
          <Box>{title}</Box>

          <HStack spacing={2}>
            <DeleteIcon cursor={"pointer"} />
            <EditIcon cursor={"pointer"} />
          </HStack>
        </Stack>
        <Box fontSize={12} fontStyle={"italic"}>
          {subtitle}
        </Box>
        <Box fontStyle={"italic"} color={"secondary.500"} fontSize={12}>
          creador/a: {author}
        </Box>
      </Stack>
    </Stack>
  );
};
