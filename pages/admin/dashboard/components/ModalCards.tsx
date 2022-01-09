import { FC } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

import { CardContent } from "./CardsContent";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle: string;
  author: string;
  content: string;
};

export const ModalCards: FC<Props> = ({ isOpen, onClose, title, subtitle, author, content }) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Vista Previa</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <CardContent
              withIcons={false}
              withContent
              content={content}
              title={title}
              subtitle={subtitle}
              author={author}
              withModal={false}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
