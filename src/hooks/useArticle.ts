import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";

import { Card_Props } from "../../types/types";
import { fetchData } from "../helpers/fetchData";

type ResponseArticles = {
  message: string;
  ok: boolean;
  data: Card_Props[];
};

export const useArticles = () => {
  const [articles, setArticles] = useState<Array<Card_Props>>([]);
  const token = getCookie("token", {
    secure: true,
  }) as string;

  useEffect(() => {
    fetchData("/api/v1/articles/show", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response: ResponseArticles) => {
        if (response.ok) {
          setArticles(response.data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [token]);

  return articles;
};
