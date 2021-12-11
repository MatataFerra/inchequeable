import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";

import User from "../../../models/User";
import { generateJwt } from "../../../helpers/auth/jwt";
import { db, disconnectDB } from "../../../../mongo/client";

type JsonResponse = {
  ok: boolean;
  message: string;
  data: unknown | string;
};

export default async function login(req: NextApiRequest, res: NextApiResponse<JsonResponse>) {
  const { email, password } = req.body;

  if (req.method !== "POST") {
    return res.status(405).json({
      ok: false,
      message: "Method not allowed",
      data: null,
    });
  }

  try {
    const connection = db(process.env.MONGO_URI);

    if (!connection) {
      disconnectDB();

      return res.status(500).json({
        ok: false,
        message: "Internal server error",
        data: null,
      });
    }

    const user = await User.findOne({ email: email });
    const validPassword = user && bcrypt.compareSync(password, user.password);

    if (!user) {
      return res.status(400).json({
        ok: false,
        message: "Usuario/contraseña incorrectos", //No es recomendable dar el error exacto
        data: null,
      });
    }

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        message: "Usuario/contraseña incorrectos", //No es recomendable dar el error exacto
        data: null,
      });
    }

    if (!user.is_admin) {
      disconnectDB();

      return res.status(400).json({
        ok: false,
        message: "No posee permisos de administrador",
        data: null,
      });
    }

    //Generar JWT
    const token = await generateJwt(user._id, user.username);

    disconnectDB();

    res.status(200).json({
      message: "Usuario loggeado correctamente",
      ok: true,
      data: token,
    });
  } catch (error) {
    console.log("Has an error on auth controller");
    console.log(error);
    res.status(500).json({
      ok: false,
      message: "Hubo un error a la hora de loggearte",
      data: null,
    });
  }
}
