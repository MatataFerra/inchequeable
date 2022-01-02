import { useEffect, useState } from "react";

import { Card_Props } from "../../types/types";

export const useArticles = (articlesFetch: Array<Card_Props>) => {
  const [articles, setArticles] = useState<Array<Card_Props>>([]);

  useEffect(() => {
    setArticles(articlesFetch ?? []);
  }, [articlesFetch]);

  return articles;
};
