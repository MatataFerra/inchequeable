import jwt, { JwtPayload } from "jsonwebtoken";
import type { NextApiRequest, NextApiResponse } from "next";

export const validateJwt = (req: NextApiRequest, res: NextApiResponse) => {
  const token = req.headers.authorization;

  interface Payload {
    uid: string | number;
    name: string;
  }

  if (!token) {
    return res.status(401).json({
      ok: false,
      message: "Invalid token",
      data: null,
    });
  }

  try {
    const payload: string | JwtPayload = jwt.verify(token, process.env.SECRET_KEY);

    return res.json({
      ok: true,
      message: "Valid token",
      data: {
        uid: (<Payload>payload).uid,
        name: (<Payload>payload).name,
      },
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
  return new Promise((resolve, reject) => {
    const payload = { uid, name };

    jwt.sign(
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
  });
};
