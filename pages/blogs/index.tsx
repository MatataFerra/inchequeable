import { Grid, GridItem, Skeleton, Stack, Text } from "@chakra-ui/react";
import { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import { useContext, useEffect } from "react";

import { Card_Props } from "../../types/types";
import { setArticles } from "../../src/context/actions/articlesActions";
import { ArticlesContext } from "../../src/context/provider";
import { Cards } from "../../src/blogs/components/Cards";
import { SpinnerLoader } from "../../src/dashboard/components/Spinner";
import { useBlog } from "../../src/hooks/useBlogs";

const Blogs: NextPage = () => {
  const { blogs, isLoading } = useBlog("/v1/articles");
  const { dispatch } = useContext(ArticlesContext);

  useEffect(() => {
    if (blogs.length > 0) {
      dispatch(setArticles(blogs));
    }
  }, [blogs, dispatch]);

  return (
    <Grid
      padding={{ lg: 8, sm: 4, base: 4 }}
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
      <GridItem colStart={1} rowStart={1} zIndex={999} marginTop={{ sm: 8, base: 8 }}>
        <Text fontSize={{ lg: 48, sm: 42, base: 36 }}> Lo inchequeable </Text>
        <Stack
          spacing={3}
          padding={4}
          height={"450px"}
          width={{ lg: 700, md: "100%" }}
          overflowY={"scroll"}
          className="scrollbar--thin"
        >
          {!isLoading ? (
            blogs.map((blog: Card_Props, index: number) => {
              return (
                <Cards
                  key={index}
                  title={blog.title}
                  author={blog.author}
                  subtitle={blog.subtitle}
                  createdAt={blog.createdAt}
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
        <Skeleton isLoaded={!isLoading}>
          <Image src="/typing.svg" alt="typing something" width={600} height={600} />
        </Skeleton>
      </GridItem>
    </Grid>
  );
};

export default Blogs;
