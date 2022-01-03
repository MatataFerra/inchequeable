import { Stack, Text, useDisclosure } from "@chakra-ui/react";
import { FC } from "react";

import { ModalCards } from "./ModalCards";
import { CardContent } from "./CardsContent";

type Props = {
  _id: string | number;
  title: string;
  subtitle: string;
  order: number;
  author: string;
  content: string;
};

export const CardsAdmin: FC<Props> = ({ order, title, subtitle, author, content, _id }) => {
  const { onOpen, isOpen, onClose } = useDisclosure();

  return (
    <Stack
      padding={2}
      direction={"row"}
      boxShadow={"0 10px 25px rgba(63, 19, 19, 0.1)"}
      alignItems={"baseline"}
    >
      <ModalCards
        isOpen={isOpen}
        onClose={onClose}
        title={title}
        subtitle={subtitle}
        author={author}
        content={content}
      />

      <Text> {order}. </Text>
      <CardContent
        withContent={false}
        withIcons
        author={author}
        title={title}
        subtitle={subtitle}
        _id={_id}
        withModal
        onOpenModal={onOpen}
      />
    </Stack>
  );
};
