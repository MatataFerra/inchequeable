import { Grid, GridItem, Stack, Text } from "@chakra-ui/react";
import { NextPage, GetServerSideProps } from "next";
import Link from "next/link";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";

import { Card_Props } from "../../types/types";
import { setArticles } from "../context/actions/articlesActions";
import { ArticlesContext } from "../context/provider";
import { Cards } from "../../src/blogs/components/Cards";

interface Data {
  data: {
    data: Array<Card_Props>;
  };
}

const Blogs: NextPage<Data> = ({ data }) => {
  const [blogs] = useState(data.data);
  const [loading, setLoading] = useState<boolean>(true);
  const { dispatch } = useContext(ArticlesContext);

  useEffect(() => {
    if (blogs?.length > 0) {
      setLoading(false);
    }
  }, [blogs?.length, blogs]);

  useEffect(() => {
    dispatch(setArticles(blogs));
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
          {!loading &&
            blogs?.map((blog: Card_Props, index: number) => {
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
            })}
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
  const res = await fetch(`${process.env.DOMAIN}/api/v1/articles`);
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
};

export default Blogs;
