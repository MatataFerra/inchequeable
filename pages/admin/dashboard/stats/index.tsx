/* eslint-disable @typescript-eslint/no-explicit-any */
import { Grid, GridItem, HStack, Stack } from "@chakra-ui/react";
import { NextPage } from "next";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import { GetServerSideProps } from "next";

import { Charts } from "../../../../src/dashboard/components/Charts";
import { SideBar } from "../../../../src/dashboard/components/SideBar";
import { getRandomColor } from "../../../../src/helpers/randomizeColor";
import { InfoCard } from "../../../../src/dashboard/components/InfoCard";
import Article from "../../../../src/models/Article";
import { connectDBWithoutRes } from "../../../../mongo/client";
import IpUsers from "../../../../src/models/IpUsers";

type DataFromServer = {
  _id: string;
  title: string;
  likes: number;
  show: boolean;
};

type DataResponse<T> = {
  ok: boolean;
  message: string;
  data: T;
};

type IpFromServer = {
  article: string[];
  country: string;
  ipv4: string;
};

interface Props {
  posts: number | string;
  likes: number | string;
  country: string;
}

const ChartsScreen: NextPage<Props> = ({ posts, likes, country }) => {
  const token = getCookie("token");

  const [labels, setLabels] = useState<string[]>([]);
  const [ipLabels, setipLabels] = useState<string[]>([]);
  const [ipData, setIpData] = useState<any>([]);
  const [data, setData] = useState<any>([]);
  const [likesLoaded, setLikesLoaded] = useState(false);

  useEffect(() => {
    const op = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    fetch("/api/v1/stats/ipusers", op)
      .then((res) => res.json())
      .then((res: DataResponse<IpFromServer[]>) => {
        const ipsCount: any = res.data.reduce((acc: any, item: any) => {
          acc[item.country] = (acc[item.country] ?? 0) + 1;

          return acc;
        }, {});

        const labels = ipsCount && Object.keys(ipsCount);
        const data = ipsCount && Object.values(ipsCount);

        setIpData(data);
        setipLabels(labels);
      })
      .catch((err) => console.log(err));
  }, [token]);

  useEffect(() => {
    const op = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    if (likesLoaded) return;

    fetch("/api/v1/stats/likes", op)
      .then((res) => res.json())
      .then((res: DataResponse<DataFromServer>) => {
        setData(res.data);
        setLikesLoaded(true);
      })
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  useEffect(() => {
    if (likesLoaded) return;

    data?.map((item: any) => {
      return setLabels((labels) => [...labels, item.title.slice(0, 15).concat("...")]);
    }) ?? [];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <HStack w={{ base: 350, md: "100%" }}>
      <SideBar />
      <Stack width={"100%"} marginInlineStart={{ base: "0!important", lg: 0.5 }}>
        <Stack direction={"column"} height="100vh" overflow="scroll">
          <Grid rowGap={8} gridTemplateRows={{ base: "1fr", lg: "40% 1fr" }} gap={8} p={4}>
            <GridItem
              display="flex"
              gridGap={4}
              p={{ lg: 8, base: 0 }}
              flexDirection={{ md: "row", base: "column" }}
            >
              <InfoCard title="Cantidad de post" data={posts} />
              <InfoCard title="Cantidad de likes" data={likes} />
              <InfoCard title="País con más Likes" data={country} />
            </GridItem>
            <GridItem
              display="flex"
              justifyContent="center"
              gridGap={4}
              flexDirection={{ base: "column", md: "row" }}
            >
              <Charts
                data={{
                  labels: labels,
                  datasets: [
                    {
                      label: "Likes en posteos",
                      data: data?.map((d: any) => d.likes),
                      backgroundColor: getRandomColor(data.length),
                    },
                  ],
                }}
                Chart={Pie}
              />

              <Charts
                data={{
                  labels: ipLabels,
                  datasets: [
                    {
                      label: "Donde se hicieron los likes",
                      data: ipData,
                      backgroundColor: getRandomColor(ipData?.length),
                    },
                  ],
                }}
                Chart={Bar}
              />
            </GridItem>
          </Grid>
        </Stack>
      </Stack>
    </HStack>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async () => {
  connectDBWithoutRes(process.env.MONGO_URI);

  type Country = {
    [key: string]: number;
  };

  const articles = await Article.find({});
  const ips = await IpUsers.find({});
  const posts = articles.length;
  const likes = articles.map((a) => a.likes).reduce((a, b) => a + b, 0);
  const country: Country = ips.reduce((acc: any, item: any) => {
    acc[item.country] = (acc[item.country] ?? 0) + 1;

    return acc;
  }, {});

  const max = Object.values(country).reduce((a, b) => Math.max(a, b));
  const countryWithMostLikes = Object.keys(country).find((key) => country[key] === max);

  return {
    props: {
      posts,
      likes,
      country: countryWithMostLikes,
    },
  };
};

export default ChartsScreen;
