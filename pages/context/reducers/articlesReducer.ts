/* eslint-disable @typescript-eslint/no-explicit-any */
import { typeActions } from "../typeAction/typeActions";
import { Card_Props } from "../../../types/types";

interface actions {
  type: typeActions;
  payload: any[] | Array<Card_Props>;
}

export const initialArticlesState = {
  articles: [] as Card_Props[],
};

export const articlesReducer = (state = initialArticlesState, action: actions) => {
  switch (action.type) {
    case typeActions.SET_ARTICLES:
      return {
        ...state,
        articles: action.payload,
      };
    default:
      return state;
  }
};
