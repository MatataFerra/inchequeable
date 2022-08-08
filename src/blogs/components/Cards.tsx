import { Stack, Text } from "@chakra-ui/react";
import { MouseEvent, MouseEventHandler } from "react";
import { useRouter } from "next/router";
import { FC } from "react";

import { useDateFormatter } from "../../hooks/useDateFormatter";

interface Props {
  title: string;
  subtitle: string;
  author: string;
  content?: string;
  createdAt: string;
  index?: number;
  id?: string | number;
}

export const Cards: FC<Props> = ({ title, author, subtitle, id, index, createdAt }) => {
  const router = useRouter();
  const order = typeof index === "number" ? index + 1 : "";
  const date = useDateFormatter(createdAt);

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
      backgroundColor={`rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
        Math.random() * 255,
      )}, ${Math.floor(Math.random() * 255)}, 0.4)`}
    >
      <Text> {order}. </Text>
      <Stack spacing={4}>
        <Text whiteSpace={"break-spaces"} fontSize={18}>
          {title}
        </Text>
        <Text
          whiteSpace={"break-spaces"}
          fontSize={12}
          fontStyle={"italic"}
          fontWeight={{ lg: 400, base: 800 }}
        >
          {subtitle}
        </Text>
        <Stack spacing={4} direction={"row"}>
          <Text fontStyle={"italic"} color={"secondary.500"} fontSize={12} fontWeight={"700"}>
            creador/a:
            <Text as="span" color={"#1b1b1b"} fontWeight={"900"} ml={2}>
              {author.length > 0 ? author : "Anónimo"}
            </Text>
          </Text>
          <Text fontStyle={"italic"} color={"secondary.500"} fontSize={12} fontWeight={"700"}>
            Subido el:
            <Text as="span" color={"#1b1b1b"} fontWeight={"900"} ml={2}>
              {date}
            </Text>
          </Text>
        </Stack>
      </Stack>
    </Stack>
  );
};
