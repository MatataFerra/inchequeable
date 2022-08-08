import { NextApiRequest, NextApiResponse } from "next";

import { db } from "../../../../../mongo/client";
import IpUsers from "../../../../../src/models/IpUsers";

type JsonResponse = {
  ok: boolean;
  message: string;
  data: unknown;
};

export default async function updateArticles(
  req: NextApiRequest,
  res: NextApiResponse<JsonResponse>,
) {
  if (req.method === "PUT") {
    const id = req.query.id;

    db(process.env.MONGO_URI, res);

    const ipUser = await IpUsers.findById(id);

    if (ipUser) {
      ipUser.article.push(req.body.article);
      await ipUser.save();
    }

    if (!ipUser) {
      return res.status(404).json({
        message: "Ip not found",
        ok: false,
        data: null,
      });
    }

    return res.status(200).json({
      message: "Ip updated",
      ok: true,
      data: ipUser,
    });
  }

  return res.status(405).json({
    message: "Method not allowed",
    ok: false,
    data: null,
  });
}
