import type { NextApiRequest, NextApiResponse } from "next";

import { db } from "../../../../../mongo/client";
import IpUsers from "../../../../models/IpUsers";

type JsonResponse = {
  ok: boolean;
  message: string;
  data: unknown;
};

export default async function createIpUser(
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
    const { ipv4, country, region, article } = req.body;

    db(process.env.MONGO_URI, res);

    const ipRegister = new IpUsers({
      ipv4,
      country,
      region,
      article,
    });

    await ipRegister.save().then((ipUser: unknown) => {
      return res.status(200).json({
        message: "Ip register succefully",
        ok: true,
        data: ipUser,
      });
    });
  }
}
