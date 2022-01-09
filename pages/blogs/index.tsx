import { Grid, GridItem, Stack, Text } from "@chakra-ui/react";
import { NextPage, GetServerSideProps } from "next";
import Link from "next/link";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";

import { Card_Props } from "../../types/types";
import { setArticles } from "../../src/context/actions/articlesActions";
import { ArticlesContext } from "../../src/context/provider";
import { Cards } from "../../src/blogs/components/Cards";
import { SpinnerLoader } from "../../src/dashboard/components/Spinner";
import Article from "../../src/models/Article";

interface Data {
  data: { articles: Array<Card_Props> };
}

const Blogs: NextPage<Data> = ({ data }) => {
  const [blogs] = useState(data);
  const [loading, setLoading] = useState<boolean>(true);
  const { dispatch } = useContext(ArticlesContext);

  useEffect(() => {
    if (blogs.articles?.length > 0) {
      setLoading(false);
    }
  }, [blogs.articles?.length, blogs]);

  useEffect(() => {
    dispatch(setArticles(blogs.articles));
  }, [blogs, dispatch]);

  return (
    <Grid
      padding={8}
      templateColumns={{ lg: "repeat(2, 1fr)", md: "1fr" }}
      templateRows={{ lg: "repeat(2, 1fr)", md: "1fr" }}
      rowGap={4}
      height={"100vh"}
    >
      <GridItem colStart={{ lg: 2, base: 1 }} zIndex={9999} rowStart={1} justifySelf={"end"}>
        <Link href="/">
          <a style={{ fontStyle: "italic" }}>Volver</a>
        </Link>
      </GridItem>
      <GridItem colStart={1} rowStart={1} zIndex={999}>
        <Text fontSize={48}> Lo inchequeable </Text>
        <Stack
          spacing={3}
          padding={4}
          height={"80%"}
          width={{ lg: 700, md: "100%" }}
          overflowY={"scroll"}
        >
          {!loading ? (
            blogs.articles?.map((blog: Card_Props, index: number) => {
              return (
                <Cards
                  key={index}
                  title={blog.title}
                  author={blog.author}
                  subtitle={blog.subtitle}
                  id={blog._id}
                  index={index}
                />
              );
            })
          ) : (
            <SpinnerLoader />
          )}
        </Stack>
      </GridItem>
      <GridItem
        colStart={{ lg: 2, md: 1, base: 1 }}
        rowStart={1}
        rowEnd={{ lg: 2, md: 1, base: 1 }}
        filter={"opacity(0.2)"}
        display={"flex"}
        justifyContent={"center"}
      >
        <Image src="/typing.svg" alt="typing something" width={600} height={600} />
      </GridItem>
    </Grid>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const articles = await Article.find();

  return {
    props: {
      data: JSON.parse(JSON.stringify(articles)),
    },
  };
};

export default Blogs;
