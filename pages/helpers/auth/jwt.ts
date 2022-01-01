import jwt from "jsonwebtoken";
import type { NextApiRequest, NextApiResponse, NextApiHandler } from "next";

import { DataResponse } from "../../../types/types";

export const validateJwt =
  (fn: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
    const token = <string>req?.headers?.authorization?.split(" ")[1];

    try {
      jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
        if (!err && decoded) {
          return await fn(req, res);
        }

        return res.status(401).json({
          ok: false,
          message: "Invalid token",
          data: null,
        });
      });
    } catch (error) {
      console.log(error);

      return res.status(401).json({
        ok: false,
        message: "Token no coincide",
        data: null,
      });
    }
  };

export const generateJwt = (uid: string | number, name: string) => {
  return new Promise(async (resolve, reject) => {
    const payload = { uid, name };

    try {
      await jwt.sign(
        payload,
        process.env.SECRET_KEY,
        {
          expiresIn: "2h",
        },
        (err, token) => {
          if (err) {
            console.log(err);
            reject("No se pudo generar el token");
          }
          resolve(token);
        },
      );
    } catch (error) {
      console.log(error);

      return reject("Hubo un error a la hora de generar el token");
    }
  });
};

export const validateClientJwt = async (token: string): Promise<DataResponse | void> => {
  return jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (!err && decoded) {
      return {
        ok: true,
        message: "Token valido",
        data: decoded,
      };
    }

    return {
      ok: false,
      message: "Token no coincide",
      data: null,
    };
  });
};
