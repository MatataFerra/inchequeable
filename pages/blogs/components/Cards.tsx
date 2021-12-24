import { Box, Stack, OrderedList, ListItem } from "@chakra-ui/react";
import { MouseEvent, MouseEventHandler } from "react";
import { useRouter } from "next/router";
import { FC } from "react";

interface Props {
  title: string;
  subtitle: string;
  author: string;
  content?: string;
  index?: number;
  id?: string | number;
}

export const Cards: FC<Props> = ({ title, author, subtitle, id }) => {
  const router = useRouter();

  const handleOpenArticle: MouseEventHandler<HTMLDivElement> = (
    e: MouseEvent<HTMLDivElement>,
  ): void => {
    e.preventDefault();
    router.push(`/article/${id}`);
  };

  return (
    <Stack
      onClick={handleOpenArticle}
      padding={2}
      direction={"row"}
      boxShadow={"0 10px 25px rgba(63, 19, 19, 0.1)"}
      cursor={"pointer"}
    >
      <OrderedList>
        <ListItem>
          <Stack spacing={0}>
            <Box fontSize={24} textTransform={"capitalize"}>
              {title}
            </Box>
            <Box> {subtitle} </Box>
            <Box fontStyle={"italic"} color={"secondary.500"} fontSize={12}>
              {author}
            </Box>
          </Stack>
        </ListItem>
      </OrderedList>
    </Stack>
  );
};
