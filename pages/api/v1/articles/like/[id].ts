import { NextApiRequest, NextApiResponse } from "next";

import { db } from "../../../../../mongo/client";
import Article from "../../../../models/Article";

type JsonResponse = {
  ok: boolean;
  message: string;
  data: unknown;
};

export default async function giveLike(req: NextApiRequest, res: NextApiResponse<JsonResponse>) {
  if (req.method !== "PUT") {
    return res.status(405).json({
      message: "Method not allowed",
      ok: false,
      data: null,
    });
  }

  if (req.method === "PUT") {
    const id = req.query.id;

    db(process.env.MONGO_URI, res);

    const oneArticle = await Article.findById(id);

    if (oneArticle) {
      oneArticle.likes += 1;

      await oneArticle.save();
    }

    if (!oneArticle) {
      return res.status(404).json({
        message: "Article not found",
        ok: false,
        data: null,
      });
    }

    return res.status(200).json({
      message: "Article liked",
      ok: true,
      data: oneArticle,
    });
  }
}
