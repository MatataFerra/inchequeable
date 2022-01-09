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
    db(process.env.MONGO_URI, res);

    const allArticles = await Article.deleteMany({});

    if (!allArticles) {
      return res.status(404).json({
        message: "For some reason, articles were not deleted",
        ok: false,
        data: null,
      });
    }

    return res.status(200).json({
      message: "Articles deleteded",
      ok: true,
      data: null,
    });
  }
});
