/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext } from "react";

import { Card_Props } from "../../types/types";

export type ArticlesContent = {
  state: { articles: Array<Card_Props> };
  dispatch: React.Dispatch<any>;
};

export const ArticlesContext = createContext<ArticlesContent>({
  state: { articles: [] },
  dispatch: () => {},
});

type FilterProps = {
  state: { filterState: string };
  dispatch: React.Dispatch<any>;
};

export const FilterContext = createContext<FilterProps>({
  state: { filterState: "" },
  dispatch: () => {},
});
