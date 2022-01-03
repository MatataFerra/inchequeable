import { Button, Grid, Input, Stack, Text, Textarea } from "@chakra-ui/react";
import { getCookie } from "cookies-next";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useState, ChangeEvent } from "react";

import { connectDBWithoutRes } from "../../../../mongo/client";
import { parseDate } from "../../../helpers/utils/dateFormatter";
import { fetchData } from "../../../helpers/utils/fetchData";
import Article from "../../../models/Article";
import { SideBar } from "../components/SideBar";

interface Props {
  id?: string;
  _id?: string | number;
  title?: string;
  content?: string;
  link?: string;
  createdAt: string;
}

const EditOneArticle: NextPage<Props> = ({ id, title, content, link, createdAt }) => {
  const router = useRouter();
  const [updateArticle, setUpdateArticle] = useState({
    title: "",
    content: "",
    link: "",
  });

  if (router.isFallback) {
    return <Text>Loading...</Text>;
  }

  if (!id || id === null) {
    return (
      <Stack>
        <Text>Article not found</Text>
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
      body: JSON.stringify({
        title: updateArticle.title,
        content: updateArticle.content,
        link: updateArticle.link,
      }),
    };

    const response = await fetchData(`http://localhost:3000/api/v1/articles/create/${id}`, options);

    console.log("response", response);

    // router.push("/admin/dashboard");
  };

  const date = JSON?.parse(createdAt);
  const dateFormatted = parseDate(date);

  return (
    <Grid templateColumns={"auto 1fr"} gap={4}>
      <SideBar />
      <Stack marginTop={4} padding={4}>
        <Stack direction={"row"} alignItems={"center"}>
          <Text>Title:</Text>
          <Input
            fontSize={"2xl"}
            name="title"
            value={updateArticle.title}
            placeholder={title}
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
            placeholder={link}
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
            minHeight={"20rem"}
            resize={"none"}
            name="content"
            placeholder={content}
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
  // 61b541ef055195beeece4fed
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
