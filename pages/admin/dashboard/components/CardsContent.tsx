import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Box, Button, Divider, HStack, Stack, Text, Tooltip, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import { getCookie } from "cookies-next";

import { fetchData } from "../../../helpers/utils/fetchData";

import { AlertDialogComponent } from "./AlertDialog";

type Props = {
  title?: string;
  subtitle?: string;
  content?: string;
  author?: string;
  _id?: string | number;
  withIcons: boolean;
  withContent: boolean;
  withModal: boolean;
  onOpenModal?: () => void;
};

export const CardContent: FC<Props> = ({
  title,
  subtitle,
  author,
  content,
  withIcons,
  withContent,
  withModal,
  _id,
  onOpenModal,
}) => {
  const router = useRouter();
  const toast = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [wantDeleteArticle, setWantDeleteArticle] = useState(false);

  const handleEditArticle = () => {
    router.push(`/admin/dashboard/edit/${_id}`);
  };

  const handleAlertClose = () => {
    setIsOpen(false);
  };

  const handleDeleteArticle = async () => {
    if (wantDeleteArticle) {
      const token = getCookie("token");

      const options = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const deleteArticle = await fetchData(
          `http://localhost:3000/api/v1/articles/delete/${_id}`,
          options,
        );

        if (deleteArticle.ok) {
          toast({
            title: "Artículo eliminado",
            description: "El artículo ha sido eliminado correctamente",
            status: "warning",
            duration: 2000,
            isClosable: true,
            onCloseComplete: () => router.reload(),
          });
        }
      } catch (error) {
        console.log(error);

        toast({
          title: "Error al eliminar el artículo",
          description: "Intente de nuevo o contacte con el administrador",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      }
    } else {
      setIsOpen(true);
    }
  };

  return (
    <Stack spacing={2} width={"100%"} height={"100%"}>
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Text isTruncated fontSize={20} color="buttons.400">
          {title}
        </Text>
        {withIcons && (
          <>
            <HStack spacing={2}>
              <Tooltip label="Eliminar">
                <DeleteIcon cursor={"pointer"} onClick={handleDeleteArticle} />
              </Tooltip>
              <Tooltip label="Editar">
                <EditIcon cursor={"pointer"} onClick={handleEditArticle} />
              </Tooltip>
            </HStack>

            <AlertDialogComponent
              isOpen={isOpen}
              handleAlertClose={handleAlertClose}
              setWantDeleteArticle={setWantDeleteArticle}
              wantDeleteArticle={wantDeleteArticle}
            />
          </>
        )}
      </Stack>
      <Box fontSize={12} fontStyle={"italic"}>
        {subtitle}
      </Box>

      {withModal ? (
        <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
          <Box fontStyle={"italic"} color={"secondary.500"} fontSize={12}>
            creador/a: {author}
          </Box>

          <Button onClick={onOpenModal} size="sm">
            Ver más
          </Button>
        </Stack>
      ) : (
        <Box fontStyle={"italic"} color={"secondary.500"} fontSize={12}>
          creador/a: {author}
        </Box>
      )}

      {withContent && (
        <Stack fontSize={14} padding={4} overflowY={"scroll"} minHeight={"100%"} height={"15rem"}>
          <Divider /> <Box>{content}</Box>
        </Stack>
      )}
    </Stack>
  );
};
