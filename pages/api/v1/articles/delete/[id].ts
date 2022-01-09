import { NextApiRequest, NextApiResponse } from "next";

import { db } from "../../../../../mongo/client";
import { validateJwt } from "../../../../../src/helpers/auth/jwt";
import Article from "../../../../models/Article";

type JsonResponse = {
  ok: boolean;
  message: string;
  data: unknown;
};

export default validateJwt(async function updateArticles(
  req: NextApiRequest,
  res: NextApiResponse<JsonResponse>,
) {
  if (req.method !== "DELETE") {
    return res.status(405).json({
      message: "Method not allowed",
      ok: false,
      data: null,
    });
  }

  if (req.method === "DELETE") {
    const id = req.query.id;

    db(process.env.MONGO_URI, res);

    const oneArticle = await Article.findByIdAndDelete(id);

    if (!oneArticle) {
      return res.status(404).json({
        message: "Article not found",
        ok: false,
        data: null,
      });
    }

    return res.status(200).json({
      message: "Article deleted",
      ok: true,
      data: oneArticle,
    });
  }
});
