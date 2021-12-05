import { Grid, GridItem, Stack, Text } from "@chakra-ui/react";
import { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

import data from "./mocks/cards.json";
import { Cards } from "./components/Cards";

type setProps = {
  title: string;
  content: string;
  author: string;
};

const Blogs: NextPage = () => {
  const [blogs] = useState<Array<setProps>>(data.data);

  return (
    <Grid padding={8} templateColumns={"repeat(2, 1fr)"} templateRows={"repeat(2, 1fr)"} rowGap={4}>
      <GridItem colStart={2} zIndex={999} rowStart={1} justifySelf={"end"}>
        <Link href="/">
          <a style={{ fontStyle: "italic" }}>Volver</a>
        </Link>
      </GridItem>
      <GridItem>
        <Text fontSize={48}> Lo inchequeable </Text>
        <Stack spacing={3} padding={4} height={"70%"} width={500} overflowY={"scroll"}>
          {blogs.map((blog: setProps, index: number) => {
            return <Cards key={index} title={blog.title} author={blog.author} index={index + 1} />;
          })}
        </Stack>
      </GridItem>
      <GridItem colStart={2} rowStart={1} rowEnd={3} filter={"opacity(0.5)"}>
        <Image src="/typing.svg" alt="typing something" width={600} height={600} />
      </GridItem>
    </Grid>
  );
};

export default Blogs;
