import { Box, Stack } from "@chakra-ui/react";
import { FC } from "react";

interface Props {
  title: string;
  author: string;
  index: number;
}

export const Cards: FC<Props> = ({ title, author, index }) => {
  return (
    <Stack padding={4} direction={"row"} boxShadow={"0 10px 25px rgba(0, 0, 0, 0.1)"}>
      <Box>{index}.</Box>
      <Stack spacing={0}>
        <Box> {title} </Box>
        <Box fontStyle={"italic"} color={"secondary.500"}>
          {author}
        </Box>
      </Stack>
    </Stack>
  );
};
