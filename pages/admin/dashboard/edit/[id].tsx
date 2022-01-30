import {
  Button,
  Grid,
  Input,
  Stack,
  Switch,
  Text,
  Textarea,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import { getCookie } from "cookies-next";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useState, ChangeEvent, useEffect } from "react";

import { connectDBWithoutRes } from "../../../../mongo/client";
import { getCookieAndValidateOnClientToken } from "../../../../src/helpers/auth/cookies";
import { fetchData } from "../../../../src/helpers/fetchData";
import Article from "../../../../src/models/Article";
import { SideBar } from "../../../../src/dashboard/components/SideBar";
import { SpinnerLoader } from "../../../../src/dashboard/components/Spinner";
import { useDateFormatter } from "../../../../src/hooks/useDateFormatter";

interface Props {
  id?: string;
  _id?: string | number;
  title?: string;
  subtitle?: string;
  content?: string;
  link?: string;
  show?: boolean;
  createdAt: string;
}

const EditOneArticle: NextPage<Props> = ({
  id,
  title,
  subtitle,
  content,
  link,
  createdAt,
  show,
}) => {
  const router = useRouter();
  const toast = useToast();
  const [updateArticle, setUpdateArticle] = useState({
    title,
    subtitle,
    content,
    link,
    show,
  });

  const dateFormatted = useDateFormatter(createdAt);

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
        console.error(err);

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

  useEffect(() => {
    show
      ? setUpdateArticle({ ...updateArticle, show: true })
      : setUpdateArticle({ ...updateArticle, show: false });
  }, [show, updateArticle]);

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

  const handleSwitchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUpdateArticle({
      ...updateArticle,
      show: e.target.checked,
    });
  };

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

    try {
      const response = await fetchData(`/api/v1/articles/update/${id}`, options);

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
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "No se pudo actualizar el artículo",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

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

        <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
          <Button minWidth={"7rem"} width={"10rem"} onClick={handleUpdate}>
            Actualizar
          </Button>
          <Tooltip label="Si está activo el artículo se muestra">
            <Stack direction={"row"} spacing={4} paddingRight={4}>
              <Text>Mostrar?</Text>
              <Switch
                colorScheme={"buttons"}
                size={"md"}
                onChange={handleSwitchChange}
                name="show"
                // checked={updateArticle.show as boolean}
                defaultChecked={updateArticle.show as boolean}
              />
            </Stack>
          </Tooltip>
        </Stack>
      </Stack>
    </Grid>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const article = await fetchData(`${process.env.NEXT_PUBLIC_DOMAIN}/api/v1/articles`);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const paths = article.data.map((post: any) => {
    return {
      params: { id: post._id },
    };
  });

  return {
    paths: paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  connectDBWithoutRes(process.env.MONGO_URI);

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const id: string | any = params?.id?.toString();
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
        show: article.show,
        createdAt: JSON.stringify(article.createdAt),
      },

      revalidate: 1,
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any | unknown | never) {
    console.error("Ocurrio un error", error.message);

    return {
      props: {
        id: null,
      },
    };
  }
};

export default EditOneArticle;
