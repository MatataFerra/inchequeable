import type { NextApiRequest, NextApiResponse } from "next";

import { db } from "../../../../mongo/client";
import Article from "../../../../src/models/Article";

type JsonResponse = {
  ok: boolean;
  message: string;
  data: unknown;
};

export default async function getArticles(req: NextApiRequest, res: NextApiResponse<JsonResponse>) {
  if (req.method === "GET") {
    db(process.env.MONGO_URI, res);
    await Article.find({ show: true })
      .sort({ createdAt: -1 })
      .then((data) => {
        return res.status(200).json({
          message: "List of articles",
          ok: true,
          data: data,
        });
      })
      .catch((error) => {
        console.error(error);

        return res.status(400).json({
          message: "Hubo un error a la hora de hacer la petición",
          ok: false,
          data: null,
        });
      });
  }
}
