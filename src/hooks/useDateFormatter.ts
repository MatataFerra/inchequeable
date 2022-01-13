import { useCallback, useMemo } from "react";

import { parseDate } from "../helpers/dateFormatter";

export const useDateFormatter = (date: number | string): string | number | Date => {
  const dateFormatted = useCallback(() => parseDate(date), [date]);

  const getDate = useMemo(() => dateFormatted(), [dateFormatted]);

  return getDate;
};
