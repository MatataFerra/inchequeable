import type { NextApiRequest, NextApiResponse } from "next";

import { db } from "../../../../../mongo/client";
import Article from "../../../../models/Article";
import { validateJwt } from "../../../../helpers/auth/jwt";

type JsonResponse = {
  ok: boolean;
  message: string;
  data: unknown;
};

export default validateJwt(async function getArticles(
  req: NextApiRequest,
  res: NextApiResponse<JsonResponse>,
) {
  if (req.method !== "POST") {
    return res.status(405).json({
      message: "Method not allowed",
      ok: false,
      data: null,
    });
  }

  if (req.method === "POST") {
    const { title, content, author, link } = req.body;

    db(process.env.MONGO_URI, res);

    const newArticle = new Article({
      title,
      content,
      author,
      link,
    });

    newArticle.save().then((article: unknown) => {
      return res.status(200).json({
        message: "Article created",
        ok: true,
        data: article,
      });
    });
  }
});
