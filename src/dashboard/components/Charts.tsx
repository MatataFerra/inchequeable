import { FC } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import { HStack } from "@chakra-ui/react";

import { BoxShadow } from "./BoxShadow";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

export const options = {
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Estadísticas",
    },
  },

  elements: {
    bar: {
      barThickness: "10px",
    },
  },
};

interface Props {
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[] | string[];
      backgroundColor?: string[];
    }[];
  };

  Chart: typeof Pie | typeof Bar;
}

export const Charts: FC<Props> = ({ data, Chart }) => (
  <HStack>
    <BoxShadow p={{ base: 0, md: 8 }} width="100%">
      <Chart options={options} height={350} width={280} data={data} />
    </BoxShadow>
  </HStack>
);
