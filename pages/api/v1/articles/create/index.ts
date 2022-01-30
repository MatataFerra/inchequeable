/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextApiRequest, NextApiResponse } from "next";

import { db } from "../../../../../mongo/client";
import Article from "../../../../../src/models/Article";
import { validateClientJwt } from "../../../../../src/helpers/auth/jwt";
import { DataResponse } from "../../../../../types/types";

type JsonResponse = {
  ok: boolean;
  message: string;
  data: unknown;
};

export default async function createArticles(
  req: NextApiRequest,
  res: NextApiResponse<JsonResponse>,
) {
  return new Promise(async (resolve) => {
    if (req.method !== "POST") {
      return res.status(405).json({
        message: "Method not allowed",
        ok: false,
        data: null,
      });
    }

    if (req.method === "POST") {
      const { title, subtitle, content, author, link } = req.body;
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
      const newArticle = new Article({
        title,
        subtitle,
        content,
        author,
        link,
      });

      await newArticle
        .save()
        .then((data: any) => {
          return resolve(
            res.status(200).json({
              message: "Article created",
              ok: true,
              data: data,
            }),
          );
        })
        .catch((error: any) => {
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
