import useSWR, { SWRConfiguration } from "swr";

import { Card_Props } from "../../types/types";

type ResponseArticles = {
  message: string;
  ok: boolean;
  data: Card_Props[];
};

const fetcher = (...args: [key: string]) => fetch(...args).then((res) => res.json());

export const useBlog = (url: string, config: SWRConfiguration = {}) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error } = useSWR<ResponseArticles>(`/api${url}`, fetcher, config);

  return {
    blogs: data?.data || [],
    isLoading: !error && !data,
    isError: error,
  };
};
