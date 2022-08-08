/* eslint-disable @typescript-eslint/no-explicit-any */
import { Grid, HStack, Stack, Text, VStack } from "@chakra-ui/react";
import { NextPage } from "next";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";

import { Charts } from "../../../../src/dashboard/components/Charts";
import { SideBar } from "../../../../src/dashboard/components/SideBar";
import { getRandomColor } from "../../../../src/helpers/randomizeColor";

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

const ChartsScreen: NextPage = () => {
  const token = getCookie("token");

  const [labels, setLabels] = useState<string[]>([]);
  const [ipLabels, setipLabels] = useState<string[]>([]);
  const [ipData, setIpData] = useState<any>([]);
  const [data, setData] = useState<any>([]);

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

    fetch("/api/v1/stats/likes", op)
      .then((res) => res.json())
      .then((res: DataResponse<DataFromServer>) => setData(res.data))
      .catch((err) => console.log(err));
  }, [token]);

  useEffect(() => {
    data?.map((item: any) => {
      return setLabels((labels) => [...labels, item.title.slice(0, 15).concat("...")]);
    }) ?? [];
  }, [data]);

  return (
    <HStack>
      <SideBar />
      <Stack width={"100%"}>
        <Stack direction={"column"} height="100vh">
          <Grid width={"100%"} height="100%">
            <VStack alignSelf={"center"}>
              <Text fontSize={"1.5rem"}>Estadísitcas sobre los post</Text>
            </VStack>
            <Stack direction={"row"} justifyContent={"space-around"} flexWrap="wrap">
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
            </Stack>
          </Grid>
        </Stack>
      </Stack>
    </HStack>
  );
};

export default ChartsScreen;
