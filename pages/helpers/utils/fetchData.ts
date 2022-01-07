/* eslint-disable @typescript-eslint/no-explicit-any */
import { DataResponse } from "../../../types/types";

export const fetchData = async (
  url: string,
  options?: RequestInit,
): Promise<DataResponse | any> => {
  const response = await fetch(url, options);
  const data = await response.json();

  return data;
};
