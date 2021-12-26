import { Card_Props } from "../../../types/types";
import { typeActions } from "../typeAction/typeActions";

export const setArticles = (articles: Array<Card_Props>) => {
  const articlesId = articles.map((article: Card_Props) => {
    return {
      _id: article._id,
    };
  });

  return { type: typeActions.SET_ARTICLES, payload: articlesId };
};
