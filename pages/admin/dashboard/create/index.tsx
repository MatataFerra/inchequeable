import { Button, Grid, Input, Stack, Text, Textarea, useToast } from "@chakra-ui/react";
import { getCookie } from "cookies-next";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState, ChangeEvent, useEffect } from "react";

import { getCookieAndValidateOnClientToken } from "../../../../src/helpers/auth/cookies";
import { fetchData } from "../../../../src/helpers/fetchData";
import { SideBar } from "../../../../src/dashboard/components/SideBar";
import { SpinnerLoader } from "../../../../src/dashboard/components/Spinner";

const CreateArticle: NextPage = () => {
  const router = useRouter();
  const toast = useToast();
  const [updateArticle, setUpdateArticle] = useState({
    title: "",
    subtitle: "",
    content: "",
    link: "",
    author: "",
    image: "",
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

  if (router.isFallback) {
    return <SpinnerLoader />;
  }

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setUpdateArticle({ ...updateArticle, [name]: value });
  };

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const { target } = e;

    if (!target.files || target.files.length === 0) return;

    for (let i = 0; i < target.files.length; i++) {
      const formData = new FormData();

      formData.append("file", target.files[i]);
      formData.append("upload_preset", "inchequeable");

      const options = {
        method: "POST",
        body: formData,
      };

      try {
        const response = await fetchData(
          `https://api.cloudinary.com/v1_1/docq8rbdu/image/upload`,
          options,
        );

        const { secure_url } = await response;

        setUpdateArticle({ ...updateArticle, image: secure_url });
      } catch (error) {
        toast({
          title: "Error",
          description: "No se pudo subir la imagen, intente nuevamente",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      }
    }
  };

  const handleUpdate = async () => {
    const token = getCookie("token");

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updateArticle),
    };

    const response = await fetchData(`/api/v1/articles/create`, options);

    if (response.ok) {
      toast({
        title: "Artículo creado",
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
        duration: 5000,
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

        <Stack direction={"row"} alignItems={"center"}>
          <Text fontSize={12}>autor:</Text>
          <Input
            fontSize={12}
            value={updateArticle.author}
            name="author"
            color={"buttons.500"}
            width={"100%"}
            type={"text"}
            onChange={handleInputChange}
          />
        </Stack>
        <Stack
          overflowY={"scroll"}
          height={{ lg: "20rem", base: "30rem" }}
          marginTop={"1.5rem !important"}
        >
          <Textarea
            minHeight={"10rem"}
            height={"100%"}
            marginBottom={"1rem !important"}
            resize={"none"}
            name="content"
            value={updateArticle.content}
            onChange={handleInputChange}
          />
        </Stack>

        <Stack direction={"row"} alignItems={"center"}>
          <Text as="label">Imagen:</Text>
          <Input
            className="input-file"
            name="image"
            width={"100%"}
            type="file"
            accept={"image/*"}
            onChange={handleImageChange}
          />
        </Stack>

        <Stack>
          <Button minWidth={"7rem"} width={"10rem"} onClick={handleUpdate}>
            Crear
          </Button>
        </Stack>
      </Stack>
    </Grid>
  );
};

export default CreateArticle;
