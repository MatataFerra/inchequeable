import { Grid, HStack, Stack, Text } from "@chakra-ui/react";
import { FC, useContext } from "react";
import Image from "next/image";

import { Card_Props } from "../../../../types/types";
import { useArticles } from "../../../hooks/useArticle";
import { FilterContext } from "../../../context/provider";

import { SideBar } from "./SideBar";
import { CardsAdmin } from "./CardsAdmin";
import { Search } from "./Search";

interface Props {
  articles: Array<Card_Props>;
}

export const DashboardScreen: FC<Props> = ({ articles }) => {
  const getArticles = useArticles(articles) as Array<Card_Props>;

  const { state } = useContext(FilterContext);

  return (
    <Grid templateColumns={"auto 1fr"} gap={4}>
      <SideBar />
      <Stack padding={4} spacing={4} height={"100vh"}>
        <HStack
          height={"fit-content"}
          spacing={4}
          justifyContent={{ lg: "normal", sm: "space-between" }}
          padding={{ lg: 0, sm: 4 }}
        >
          <Text fontSize={42} fontStyle={"italic"}>
            Hola Dios Admin
          </Text>
          <Image src={"/bottle.svg"} alt="Botella" width={70} height={70} />
        </HStack>
        <Search />
        <Stack
          spacing={3}
          padding={4}
          height={"80%"}
          width={{ lg: "80%", sm: "100%" }}
          overflowY={"scroll"}
        >
          {getArticles
            .filter((article) => {
              return article.title.toLowerCase().includes(state.filterState.toLowerCase());
            })
            .map((article: Card_Props, index: number) => {
              return (
                <CardsAdmin
                  key={index}
                  _id={article._id}
                  title={article.title}
                  author={article.author}
                  subtitle={article.subtitle}
                  content={article.content}
                  order={index + 1}
                />
              );
            })}
        </Stack>
      </Stack>
    </Grid>
  );
};
