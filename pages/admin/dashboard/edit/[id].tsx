import { Button, Grid, Input, Stack, Text, Textarea, useToast } from "@chakra-ui/react";
import { getCookie } from "cookies-next";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useState, ChangeEvent, useEffect } from "react";

import { connectDBWithoutRes } from "../../../../mongo/client";
import { getCookieAndValidateOnClientToken } from "../../../helpers/auth/cookies";
import { parseDate } from "../../../helpers/utils/dateFormatter";
import { fetchData } from "../../../helpers/utils/fetchData";
import Article from "../../../models/Article";
import { SideBar } from "../components/SideBar";
import { SpinnerLoader } from "../components/Spinner";

interface Props {
  id?: string;
  _id?: string | number;
  title?: string;
  subtitle?: string;
  content?: string;
  link?: string;
  createdAt: string;
}

const EditOneArticle: NextPage<Props> = ({ id, title, subtitle, content, link, createdAt }) => {
  const router = useRouter();
  const toast = useToast();
  const [updateArticle, setUpdateArticle] = useState({
    title,
    subtitle,
    content,
    link,
  });

  useEffect(() => {
    getCookieAndValidateOnClientToken({ secure: true })
      .then((token) => {
        if (!token) {
          toast({
            title: "El token es inválido",
            description: "Serás redirigido a la página de inicio",
            status: "warning",
            duration: 2000,
            isClosable: false,
            onCloseComplete: () => router.push("/admin"),
          });
        }
      })
      .catch((err) => {
        console.log(err);

        toast({
          title: "Hubo un error en la sesión",
          description: "Por seguridad serás redirigido a la página de inicio",
          status: "error",
          duration: 2000,
          isClosable: false,
          onCloseComplete: () => router.push("/admin"),
        });
      });
  }, [router, toast]);

  useEffect(() => {
    if (!title && !subtitle && !content && !link) {
      toast({
        title: "Recuperando información",
        description: "Espere un momento mientras se recupera la información",
        status: "info",
        duration: 1500,
        isClosable: true,
        onCloseComplete: () => router.replace("/admin/dashboard"),
      });
    }
  }, [title, subtitle, content, link, router, toast]);

  if (router.isFallback) {
    return <SpinnerLoader />;
  }

  if (!id || id === null) {
    return (
      <Stack alignItems={"center"} justifyContent={"center"} height={"100vh"}>
        <Text fontSize={"2xl"}>Article not found</Text>
      </Stack>
    );
  }

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setUpdateArticle({ ...updateArticle, [name]: value });
  };

  const handleUpdate = async () => {
    const id = router.query.id as string;
    const token = getCookie("token");

    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updateArticle),
    };

    const response = await fetchData(
      `${process.env.NEXT_PUBLIC_DOMAIN}/api/v1/articles/update/${id}`,
      options,
    );

    if (response.ok) {
      toast({
        title: "Artículo actualizado",
        description: "Serás redireccionado a la página principal en 3 segundos",
        status: "success",
        duration: 3000,
        isClosable: true,
        onCloseComplete: () => router.push("/admin/dashboard"),
      });
    } else {
      toast({
        title: "Error",
        description: "No se pudo actualizar el artículo",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const date = JSON?.parse(createdAt);
  const dateFormatted = parseDate(date);

  return (
    <Grid templateColumns={"auto 1fr"} gap={4}>
      <SideBar />
      <Stack marginTop={4} padding={{ base: "1rem 1rem 1rem 0" }}>
        <Stack direction={"row"} alignItems={"center"}>
          <Text>Título:</Text>
          <Input
            name="title"
            value={updateArticle.title}
            width={"100%"}
            type={"text"}
            onChange={handleInputChange}
          />
        </Stack>

        <Stack direction={"row"} alignItems={"center"}>
          <Text>Subtitulo:</Text>
          <Input
            name="subtitle"
            value={updateArticle.subtitle}
            width={"100%"}
            type={"text"}
            onChange={handleInputChange}
          />
        </Stack>
        <Stack direction={"row"} alignItems={"center"}>
          <Text fontSize={12}>fuente:</Text>
          <Input
            fontSize={12}
            value={updateArticle.link}
            name="link"
            color={"secondary.500"}
            width={"100%"}
            type={"text"}
            onChange={handleInputChange}
          />
        </Stack>
        <Text fontSize={12}> fecha de creación: {dateFormatted} </Text>
        <Stack
          overflowY={"scroll"}
          height={{ lg: "20rem", base: "30rem" }}
          marginTop={"1.5rem !important"}
        >
          <Textarea
            minHeight={"10rem"}
            height={"15rem"}
            marginBottom={"1rem !important"}
            resize={"none"}
            name="content"
            value={updateArticle.content}
            onChange={handleInputChange}
          />
        </Stack>

        <Stack>
          <Button minWidth={"7rem"} width={"10rem"} onClick={handleUpdate}>
            Actualizar
          </Button>
        </Stack>
      </Stack>
    </Grid>
  );
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [{ params: { id: "1" } }],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  connectDBWithoutRes(process.env.MONGO_URI);

  try {
    const id: string | unknown = params?.id?.toString();
    const article = await Article.findById(id);

    if (!article) {
      return { props: { id: null } };
    }

    return {
      props: {
        id: true,
        _id: id,
        title: article.title,
        subtitle: article.subtitle,
        content: article.content,
        link: article.link,
        createdAt: JSON.stringify(article.createdAt),
      },
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any | unknown | never) {
    console.log("Ocurrio un error", error.message);

    return {
      props: {
        id: null,
      },
    };
  }
};

export default EditOneArticle;
