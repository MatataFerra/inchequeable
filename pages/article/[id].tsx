import { NextPage, GetStaticPaths, GetStaticProps } from "next";
import { Box, Grid, GridItem, Skeleton, Stack, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";

import { connectDBWithoutRes } from "../../mongo/client";
import Article from "../models/Article";

interface Props {
  id: string;
}

const OneArticlePage: NextPage<Props> = ({ id }) => {
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

  return (
    <>
      <Stack height={"100vh"}>
        <Grid templateColumns="repeat(2, 1fr)" height={"100%"}>
          <GridItem
            backgroundImage={`url("/typing_boy.svg")`}
            backgroundRepeat={"no-repeat"}
            filter={"opacity(0.5)"}
            backgroundSize={"contain"}
          />
          <GridItem padding={4}>
            <Stack direction={"row"} justifyContent={"space-between"}>
              <Box> Volver </Box>
              <Box> próxima </Box>
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
        id: "text",
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
