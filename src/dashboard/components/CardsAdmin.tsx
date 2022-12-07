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
  image: string;
  show?: boolean;
};

export const CardsAdmin: FC<Props> = ({
  order,
  title,
  subtitle,
  author,
  content,
  _id,
  image,
  show,
}) => {
  const { onOpen, isOpen, onClose } = useDisclosure();

  return (
    <Stack
      padding={{ lg: "0.5rem", sm: 2 }}
      direction={"row"}
      boxShadow={show ? "0 10px 25px rgba(63, 19, 19, 0.1)" : "0 0 0 0"}
      alignItems={"baseline"}
      backgroundColor={show ? "#fff" : "#a0a0a03c"}
      _hover={{ cursor: "pointer", backgroundColor: show && "gray.100" }}
    >
      <ModalCards
        isOpen={isOpen}
        onClose={onClose}
        title={title}
        subtitle={subtitle}
        author={author}
        content={content}
        image={image}
      />

      <Text color={show ? "#1C222E" : "#1c222e2d"}> {order}. </Text>
      <CardContent
        withContent={false}
        withIcons
        author={author}
        image={image}
        title={title}
        subtitle={subtitle}
        show={show}
        _id={_id}
        withModal
        onOpenModal={onOpen}
      />
    </Stack>
  );
};
