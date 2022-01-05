/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch, FC, RefObject, SetStateAction, useEffect, useRef } from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import { WarningIcon } from "@chakra-ui/icons";

type Props = {
  isOpen: boolean;
  handleAlertClose: () => void;
  setWantDeleteArticle: Dispatch<SetStateAction<boolean>>;
  wantDeleteArticle: boolean;
  handleDeleteArticle: () => void;
};

export const AlertDialogComponent: FC<Props> = ({
  isOpen,
  handleAlertClose,
  setWantDeleteArticle,
  wantDeleteArticle,
  handleDeleteArticle,
}) => {
  const cancelRef = useRef() as RefObject<any>;

  const handleAcceptDelete = () => {
    setWantDeleteArticle(true);
    handleAlertClose();
  };

  const handleCancel = () => {
    setWantDeleteArticle(false);
    handleAlertClose();
  };

  useEffect(() => {
    if (wantDeleteArticle) {
      handleDeleteArticle();
    }
  }, [handleDeleteArticle, wantDeleteArticle]);

  return (
    <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={handleAlertClose}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          {/* <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Borrar artículo
          </AlertDialogHeader> */}

          <AlertDialogBody
            color="buttons.500"
            padding={4}
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <WarningIcon width={50} height={50} marginBottom={4} />
            ¿Estás seguro que deseas borrar el artículo?
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={handleCancel}>
              Cancel
            </Button>
            <Button colorScheme="red" ml={3} onClick={handleAcceptDelete}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};
