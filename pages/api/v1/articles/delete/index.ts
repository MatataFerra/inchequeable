import { NextApiRequest, NextApiResponse } from "next";

import { db } from "../../../../../mongo/client";
import { validateClientJwt } from "../../../../../src/helpers/auth/jwt";
import Article from "../../../../../src/models/Article";
import { DataResponse } from "../../../../../types/types";

type JsonResponse = {
  ok: boolean;
  message: string;
  data: unknown;
};

export default async function deleteAllArticles(
  req: NextApiRequest,
  res: NextApiResponse<JsonResponse>,
) {
  return new Promise(async (resolve) => {
    if (req.method !== "DELETE") {
      return res.status(405).json({
        message: "Method not allowed",
        ok: false,
        data: null,
      });
    }

    if (req.method === "DELETE") {
      const token = req?.headers?.authorization?.split(" ")[1] as string;

      const checkToken = (await validateClientJwt(token)) as DataResponse;

      if (!checkToken.ok) {
        return resolve(
          res.status(401).json({
            message: "Invalid token",
            ok: false,
            data: null,
          }),
        );
      }

      db(process.env.MONGO_URI, res);
      Article.deleteMany({})
        .then((data) => {
          return resolve(
            res.status(200).json({
              message: "Article deleteded",
              ok: true,
              data: data,
            }),
          );
        })
        .catch((error) => {
          console.error(error);

          return resolve(
            res.status(500).json({
              message: "Internal server error",
              ok: false,
              data: null,
            }),
          );
        });
    }
  });
}
