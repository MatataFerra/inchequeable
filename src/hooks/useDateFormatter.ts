import { useCallback, useEffect, useState } from "react";

import { parseDate } from "../helpers/dateFormatter";

export const useDateFormatter = (date: number | string): string => {
  const [dateState, setdateState] = useState("");
  const dateFormatted = useCallback(() => parseDate(date), [date]);

  useEffect(() => {
    setdateState(dateFormatted());
  }, [dateFormatted]);

  return dateState;
};
