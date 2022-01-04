/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch, FC, RefObject, SetStateAction, useRef } from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";

type Props = {
  isOpen: boolean;
  handleAlertClose: () => void;
  setWantDeleteArticle: Dispatch<SetStateAction<boolean>>;
  wantDeleteArticle: boolean;
};

export const AlertDialogComponent: FC<Props> = ({
  isOpen,
  handleAlertClose,
  setWantDeleteArticle,
  wantDeleteArticle,
}) => {
  const cancelRef = useRef() as RefObject<any>;

  const handleDecision = () => {
    setWantDeleteArticle(!wantDeleteArticle);
    handleAlertClose();
  };

  return (
    <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={handleAlertClose}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Borrar artículo
          </AlertDialogHeader>

          <AlertDialogBody>Estás seguro que deseas borrar el artículo</AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={handleAlertClose}>
              Cancel
            </Button>
            <Button colorScheme="red" ml={3} onClick={handleDecision}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};
