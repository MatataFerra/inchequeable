import { typeActions } from "../typeAction/typeActions";

export const setFilter = (filter: string) => {
  return {
    type: typeActions.SET_FILTER,
    payload: filter,
  };
};
