import type { NextApiRequest, NextApiResponse } from "next";

import { db } from "../../../../../mongo/client";
import IpUsers from "../../../../models/IpUsers";

type JsonResponse = {
  ok: boolean;
  message: string;
  data: unknown;
};

export default async function getIpUser(req: NextApiRequest, res: NextApiResponse<JsonResponse>) {
  if (req.method !== "GET") {
    return res.status(405).json({
      message: "Method not allowed",
      ok: false,
      data: null,
    });
  }

  if (req.method === "GET") {
    db(process.env.MONGO_URI, res);

    await IpUsers.findOne({ ipv4: req.query.ipv4 })
      .then((data) => {
        return res.status(200).json({
          message: "Ip user found",
          ok: true,
          data: data,
        });
      })
      .catch((error) => {
        console.log(error);

        return res.status(400).json({
          message: "Hubo un error a la hora de hacer la petición",
          ok: false,
          data: null,
        });
      });
  }
}
