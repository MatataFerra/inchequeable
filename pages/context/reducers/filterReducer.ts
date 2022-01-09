import { typeActions } from "../typeAction/typeActions";

export const initialFilterState = {
  filterState: "",
};

interface actionsProps {
  type: typeActions;
  payload: string;
}

export const filterReducer = (state = initialFilterState, action: actionsProps) => {
  switch (action.type) {
    case typeActions.SET_FILTER:
      return {
        ...state,
        filterState: action.payload,
      };
    default:
      return state;
  }
};
