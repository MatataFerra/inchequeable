import { NextPage, GetStaticPaths, GetStaticProps } from "next";
import { Box, Grid, GridItem, Link, Stack, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import NextLink from "next/link";
import { useContext, useEffect, useState } from "react";

import { connectDBWithoutRes } from "../../mongo/client";
import Article from "../models/Article";
import { parseDate } from "../helpers/utils/dateFormatter";
import { HeartIcon } from "../icons/Heart";
import { ArticlesContext } from "../context/provider";
import { stringOrNumber, Card_Props } from "../../types/types";

import { SkelletonArticle } from "./components/SkelettonArticle";

interface Props {
  id: string;
  _id: string | number;
  title: string;
  content: string;
  link: string;
  createdAt: string;
}

const OneArticlePage: NextPage<Props> = ({ id, title, content, link, createdAt, _id }) => {
  const router = useRouter();
  const [heartClicked, setHeartClicked] = useState(false);
  const [nextArticle, setNextArticle] = useState<Card_Props | undefined | stringOrNumber>(id);
  const [colorHeart, setColorHeart] = useState("transparent");

  const { state } = useContext(ArticlesContext);

  useEffect(() => {
    if (!state.articles) {
      router.push("/blogs");
    }

    const i = state.articles.findIndex((article: Card_Props) => article._id === _id);
    const initialArticle = state.articles[0]?._id;
    const nextArticleId = state.articles.at(i + 1);
    const indexNextArticle = nextArticleId ? nextArticleId?._id : initialArticle;

    setNextArticle(indexNextArticle);
  }, [state.articles, id, _id, router]);

  if (router.isFallback) {
    return <SkelletonArticle />;
  }

  if (!id || id === null) {
    return (
      <Stack>
        <Text>Article not found</Text>
      </Stack>
    );
  }

  const handleHeart = () => {
    if (!heartClicked) {
      setColorHeart("red.500");

      setHeartClicked(true);
    } else {
      setColorHeart("transparent");

      setHeartClicked(false);
    }
  };

  const date = JSON?.parse(createdAt);
  const dateFormatted = parseDate(date);

  return (
    <>
      <Stack height={"100vh"}>
        <Grid templateColumns={{ lg: "repeat(2, 1fr)", sm: "repeat(1, 1fr)" }} height={"100%"}>
          <GridItem
            backgroundImage={`url("/typing_boy.svg")`}
            backgroundRepeat={"no-repeat"}
            filter={"opacity(0.5)"}
            backgroundSize={"contain"}
            display={{ lg: "block", base: "none" }}
          />
          <GridItem padding={4}>
            <Stack direction={"row"} justifyContent={"space-between"}>
              <Box>
                <NextLink href={"/blogs"}> Volver</NextLink>
              </Box>
              <Box>
                <NextLink href={`/article/${nextArticle}`}>próxima</NextLink>
              </Box>
            </Stack>
            <Stack marginTop={4}>
              <Text fontSize={"2xl"}>{title}</Text>
              <Text fontSize={12}>
                fuente:
                <Link href={link} color={"secondary.500"} marginLeft={2} target={"_blank"}>
                  {link}
                </Link>
              </Text>
              <Text fontSize={12}> fecha de creación: {dateFormatted} </Text>
              <Stack
                overflowY={"scroll"}
                height={{ lg: "20rem", base: "30rem" }}
                marginTop={"1.5rem !important"}
              >
                <Text>{content}</Text>
              </Stack>
              <Stack
                cursor={"pointer"}
                width={"fit-content"}
                onClick={handleHeart}
                direction={"row"}
                spacing={4}
                alignItems={"center"}
                marginTop={"1.5rem !important"}
              >
                <HeartIcon
                  color={colorHeart}
                  width={6}
                  height={6}
                  transition={"ease-in-out 0.2s color"}
                />

                <Text fontSize={12} fontWeight={"600"}>
                  Dale tu Like (No hay otra opción)
                </Text>
              </Stack>
            </Stack>
          </GridItem>
        </Grid>
      </Stack>
    </>
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

export default OneArticlePage;
