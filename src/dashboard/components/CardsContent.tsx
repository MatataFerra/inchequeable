import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Button, Divider, HStack, Stack, Text, Tooltip, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import { getCookie } from "cookies-next";

import { fetchData } from "../../helpers/fetchData";

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
  show?: boolean;
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
  show,
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

  const handleAlertOpen = () => {
    setIsOpen(true);
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
          `${process.env.NEXT_PUBLIC_DOMAIN}/api/v1/articles/delete/${_id}`,
          options,
        );

        if (deleteArticle.ok) {
          setWantDeleteArticle(false);
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
    }
  };

  return (
    <Stack spacing={2} width={"100%"} height={"100%"} padding={"0.5rem"}>
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Text
          isTruncated
          whiteSpace={"break-spaces"}
          fontSize={{ lg: 20, sm: 16 }}
          color={"buttons.400"}
        >
          {title}
        </Text>
        {withIcons && (
          <>
            <HStack spacing={2}>
              <Tooltip label="Eliminar">
                <DeleteIcon cursor={"pointer"} onClick={handleAlertOpen} />
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
              handleDeleteArticle={handleDeleteArticle}
            />
          </>
        )}
      </Stack>
      <Text isTruncated fontSize={12} fontStyle={"italic"} whiteSpace={"break-spaces"}>
        {subtitle}
      </Text>

      {withModal ? (
        <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
          <Text isTruncated fontStyle={"italic"} color={"secondary.500"} fontSize={12}>
            creador/a: {author}
          </Text>

          <Button onClick={onOpenModal} size="sm" colorScheme={show ? "secondary" : "gray"}>
            Ver más
          </Button>
        </Stack>
      ) : (
        <Text isTruncated fontStyle={"italic"} color={"secondary.500"} fontSize={12}>
          creador/a: {author}
        </Text>
      )}

      {withContent && (
        <Stack fontSize={14} padding={4} overflowY={"scroll"} minHeight={"100%"} height={"15rem"}>
          <Divider /> <Text noOfLines={8}>{content}</Text>
        </Stack>
      )}
    </Stack>
  );
};
