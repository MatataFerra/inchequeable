import { NextPage, GetStaticPaths, GetStaticProps } from "next";
import {
  Box,
  Grid,
  GridItem,
  HStack,
  Link,
  SkeletonCircle,
  SkeletonText,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import NextLink from "next/link";
import { useContext, useEffect, useState } from "react";
import reactStringReplace from "react-string-replace";

import { useDateFormatter } from "../../src/hooks/useDateFormatter";
import { connectDBWithoutRes } from "../../mongo/client";
import Article from "../../src/models/Article";
import { HeartIcon } from "../../src/icons/Heart";
import { ArticlesContext } from "../../src/context/provider";
import { stringOrNumber, Card_Props } from "../../types/types";
import { fetchData } from "../../src/helpers/fetchData";
import { useIpUser } from "../../src/hooks/useIpUser";
import { getIpUser, userHasBeenLided } from "../../src/helpers/likedArticle";
import { setArticles } from "../../src/context/actions/articlesActions";
import { SkelletonArticle } from "../../src/articles/components/SkelettonArticle";
import { MessageLike } from "../../src/articles/components/MessageLike";
import { FacebookButton, WhatsappButton } from "../../src/articles/components/Share";

interface Props {
  id: string;
  _id: string | number;
  title: string;
  content: string;
  link: string;
  createdAt: string;
  randomNumberToChangeBG: number;
}

type ResponseArticles = {
  message: string;
  ok: boolean;
  data: Card_Props[];
};

const OneArticlePage: NextPage<Props> = ({
  id,
  title,
  content,
  link,
  createdAt,
  _id,
  randomNumberToChangeBG,
}) => {
  const router = useRouter();
  const [ipv4, country, region] = useIpUser();
  const [userLikedArticle, setUserLikedArticle] = useState(false);
  const [loadingLike, setLoadingLike] = useState(false);

  const [contentBr, setContentBr] = useState("");
  const [nextArticle, setNextArticle] = useState<Card_Props | undefined | stringOrNumber>(id);
  const [colorHeart, setColorHeart] = useState("transparent");

  const { state, dispatch } = useContext(ArticlesContext);

  const dateFormatted = useDateFormatter(createdAt);

  useEffect(() => {
    if (state.articles.length === 0) {
      fetchData(`/api/v1/articles`)
        .then((data: ResponseArticles) => {
          dispatch(setArticles(data.data));
        })

        .catch((err: unknown) => {
          console.log(err);
        });
    }
  }, [dispatch, state.articles.length]);

  useEffect(() => {
    setUserLikedArticle(false);
    setLoadingLike(false);

    getIpUser(ipv4)
      .then((res) => {
        if (res.ok) {
          res.data.article.map(
            (article: { _id: string }) => article._id === _id && setUserLikedArticle(true),
          );
        }

        setLoadingLike(true);
      })
      .catch((err: unknown) => {
        console.log(err);

        console.log(
          "Waiting for connection, if error persists, check your internet connection or try again later",
        );
      });
  }, [ipv4, _id]);

  useEffect(() => {
    if (userLikedArticle) {
      setColorHeart("red.500");
    } else {
      setColorHeart("transparent");
    }
  }, [userLikedArticle]);

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

  useEffect(() => {
    const paresedContent = content?.replace(/\n/g, "<br/>");

    setContentBr(paresedContent);
  }, [content]);

  if (router.isFallback) {
    return <SkelletonArticle />;
  }

  if (!id || id === null) {
    return (
      <Stack alignItems={"center"} justifyContent={"center"} height={"100vh"}>
        <Text fontSize={"2xl"}>Article not found</Text>
      </Stack>
    );
  }

  const handleColorOfHeart = () => {
    if (userLikedArticle) {
      setColorHeart("red.500");
    } else {
      setColorHeart("transparent");
    }
  };

  const handleLike = async () => {
    if (!userLikedArticle) {
      const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      };

      const articleLike = await fetchData(`/api/v1/articles/like/${_id}`, options);

      if (articleLike.ok) {
        const id: string = articleLike.data._id;
        const ipRegister = await userHasBeenLided(ipv4, country, region, id);

        handleColorOfHeart();

        if (ipRegister) {
          setUserLikedArticle(true);
        }
      }
    }
  };

  return (
    <>
      <Stack height={{ lg: "100vh", sm: "100%", base: "100%" }}>
        <Grid
          templateColumns={{ lg: "repeat(2, 1fr)", sm: "repeat(1, 1fr)" }}
          height={"100%"}
          alignContent={"center"}
        >
          <GridItem
            backgroundImage={
              randomNumberToChangeBG % 2 === 0
                ? `url("/typing_boy.svg")`
                : `url("/drinking_coffee.svg")`
            }
            backgroundRepeat={"no-repeat"}
            filter={"opacity(0.5)"}
            backgroundSize={"contain"}
            display={{ lg: "block", base: "none" }}
            backgroundPosition={"center"}
          />
          <GridItem padding={4} height={{ lg: "36rem", sm: "100%", base: "100%" }}>
            <Stack direction={"row"} justifyContent={"space-between"}>
              <Box>
                <NextLink href={"/blogs"}> Volver</NextLink>
              </Box>
              <Box>
                <NextLink href={`/article/${nextArticle}`}>próxima</NextLink>
              </Box>
            </Stack>
            <Stack marginTop={4}>
              <Stack height={"8rem"}>
                <Text fontSize={"2xl"}>{title}</Text>
                <Text fontSize={12}>
                  fuente:
                  <Link
                    href={link}
                    color={"secondary.500"}
                    marginLeft={2}
                    target={"_blank"}
                    fontStyle={"italic"}
                    isTruncated
                  >
                    Click para ir a la fuente
                  </Link>
                </Text>
                <Text fontSize={12}> fecha de creación: {dateFormatted} </Text>
              </Stack>
              <Stack
                overflowY={"scroll"}
                height={{ lg: "20rem", base: "30rem" }}
                marginTop={"1.5rem !important"}
              >
                <Text>
                  {reactStringReplace(contentBr, "<br/>", (match, i) => (
                    <br key={i} />
                  ))}
                </Text>
              </Stack>
              <Stack
                width={"100%"}
                direction={"row"}
                spacing={4}
                alignItems={"center"}
                marginTop={"1.5rem !important"}
                transition={"all 0.3s ease-in-out"}
                justifyContent={"space-between"}
              >
                {!loadingLike ? (
                  <HStack>
                    <SkeletonCircle width={6} height={6} />
                    <SkeletonText noOfLines={1} width={20} />
                  </HStack>
                ) : (
                  <>
                    <HStack>
                      <HeartIcon
                        color={colorHeart}
                        width={6}
                        height={6}
                        transition={"ease-in-out 0.2s color"}
                        stroke={"#474747"}
                        onClick={handleLike}
                      />

                      <MessageLike state={userLikedArticle} />
                    </HStack>
                  </>
                )}

                <HStack>
                  <FacebookButton id={_id} />
                  <WhatsappButton id={_id} />
                </HStack>
              </Stack>
            </Stack>
          </GridItem>
        </Grid>
      </Stack>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const article = await fetchData(`${process.env.NEXT_PUBLIC_DOMAIN}/api/v1/articles`);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const paths = article.data.map((post: any) => ({
    params: { id: post._id },
  }));

  return {
    paths: paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  connectDBWithoutRes(process.env.MONGO_URI);

  try {
    const article = await Article.findById(params?.id);

    if (!article) {
      return { props: { id: null } };
    }

    const randomNumber = Math.floor(Math.random() * 10);

    return {
      props: {
        id: true,
        _id: params?.id,
        title: article.title,
        content: article.content,
        link: article.link,
        createdAt: article.createdAt.toString(),
        randomNumberToChangeBG: Math.abs(randomNumber),
      },

      revalidate: 1,
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
