/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, useContext } from "react";

import { Card_Props } from "../../types/types";

export type ArticlesContent = {
  state: { articles: Array<Card_Props> };
  dispatch: React.Dispatch<any>;
};

export const ArticlesContext = createContext<ArticlesContent>({
  state: { articles: [] },
  dispatch: () => {},
});

export const useGlobalContext = () => useContext(ArticlesContext);

// import { createContext, useContext } from "react"
// export type GlobalContent = {
//   copy: string
//   setCopy:(c: string) => void
// }
// export const MyGlobalContext = createContext<GlobalContent>({
// copy: 'Hello World', // set a default value
// setCopy: () => {},
// })
// export const useGlobalContext = () => useContext(MyGlobalContext)
