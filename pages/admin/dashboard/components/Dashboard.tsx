import { Container, Grid, HStack, Stack, Text } from "@chakra-ui/react";
import { FC, useContext } from "react";
import Image from "next/image";

import { Card_Props } from "../../../../types/types";
import { useArticles } from "../../../hooks/useArticle";
import { FilterContext } from "../../../context/provider";

import { SideBar } from "./SideBar";
import { CardsAdmin } from "./CardsAdmin";
import { Search } from "./Search";
import { DeleteAllButton } from "./DeleteAllButton";

interface Props {
  articles: Array<Card_Props>;
}

export const DashboardScreen: FC<Props> = ({ articles }) => {
  const getArticles = useArticles(articles) as Array<Card_Props>;

  const { state } = useContext(FilterContext);

  return (
    <Grid templateColumns={"auto 1fr"}>
      <SideBar />
      <Stack spacing={4} height={"100vh"} padding={8}>
        <HStack spacing={4} width={"fit-content"}>
          <Text fontSize={36} fontStyle={"italic"}>
            Hola Dios Admin
          </Text>
          <Image src={"/bottle.svg"} alt="Botella" width={70} height={70} />
        </HStack>
        <Search />
        <DeleteAllButton articlesLen={getArticles.length} />
        <Stack spacing={3} height={"80%"} overflowY={"scroll"}>
          {getArticles.length > 0 ? (
            getArticles
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
                    show={article.show}
                    order={index + 1}
                  />
                );
              })
          ) : (
            <Container fontSize={32} display={"grid"} placeContent={"center"} height={"100%"}>
              No hay artículos cargados...
            </Container>
          )}
        </Stack>
      </Stack>
    </Grid>
  );
};
