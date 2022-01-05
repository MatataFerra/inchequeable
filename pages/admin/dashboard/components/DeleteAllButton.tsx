import { Box, Button, Stack, useToast } from "@chakra-ui/react";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import { FC } from "react";

import { fetchData } from "../../../helpers/utils/fetchData";

type Props = {
  articlesLen: number;
};

export const DeleteAllButton: FC<Props> = ({ articlesLen }) => {
  const toast = useToast();
  const router = useRouter();

  const handleDeleteAll = async () => {
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
        `http://localhost:3000/api/v1/articles/delete`,
        options,
      );

      if (deleteArticle.ok) {
        toast({
          title: "Eliminando todos los artículos",
          description: "La página se recargará en unos segundos",
          status: "success",
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
  };

  return (
    <Stack
      alignItems={{ base: "flex-start", lg: "flex-end" }}
      width={"80%"}
      padding={{ lg: "0.5rem", sm: 0 }}
    >
      <Box>
        <Button
          colorScheme={"error"}
          size={"sm"}
          marginRight={{ lg: 0, sm: 8 }}
          marginBottom={{ lg: 0, sm: 8 }}
          disabled={articlesLen === 0}
          onClick={handleDeleteAll}
        >
          Borrar todos
        </Button>
      </Box>
    </Stack>
  );
};
