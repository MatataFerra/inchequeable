import type { NextApiRequest, NextApiResponse } from "next";

import { db } from "../../../../mongo/client";
import IpUsers from "../../../models/IpUsers";

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

    try {
      const getallIp = await IpUsers.find({}).populate("article").exec();

      if (getallIp.length === 0) {
        return res.status(404).json({
          message: "Ip of users not found",
          ok: false,
          data: null,
        });
      }

      return res.status(200).json({
        message: "IpUsers found",
        ok: true,
        data: getallIp,
      });
    } catch (error) {
      console.log(error);

      return res.status(500).json({
        message: "Internal server error",
        ok: false,
        data: null,
      });
    }
  }
}
