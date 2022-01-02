/* eslint-disable @typescript-eslint/no-explicit-any */
import { getCookie } from "cookies-next";

import { DataResponse } from "../../../types/types";

import { validateClientJwt } from "./jwt";

export const getCookieAndValidateToken = async (options: any) => {
  const getTokenOnCookie = getCookie("token", options) as string;

  const result = (await validateClientJwt(getTokenOnCookie)) as DataResponse;

  return result;
};
