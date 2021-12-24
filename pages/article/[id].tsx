import { NextPage, GetStaticPaths, GetStaticProps } from "next";
import { Box, Grid, GridItem, Link, Skeleton, Stack, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import NextLink from "next/link";

import { connectDBWithoutRes } from "../../mongo/client";
import Article from "../models/Article";
import { parseDate } from "../helpers/utils/dateFormatter";

interface Props {
  id: string;
  title: string;
  content: string;
  link: string;
  createdAt: string;
}

const OneArticlePage: NextPage<Props> = ({ id, title, content, link, createdAt }) => {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <Stack>
        <Skeleton height="20px" width={"50%"} />
      </Stack>
    );
  }

  if (!id || id === null) {
    return (
      <Stack>
        <Text>Article not found</Text>
      </Stack>
    );
  }

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
              <Box> próxima </Box>
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
                height={{ lg: "25rem", base: "30rem" }}
                marginTop={"1.5rem !important"}
              >
                <Text>{content}</Text>
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
