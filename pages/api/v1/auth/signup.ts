import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";

import { db, disconnectDB } from "../../../../mongo/client";
import User from "../../../../src/models/User";
import { checkRegExp } from "../../../../src/helpers/auth/regex";
import { generateJwt } from "../../../../src/helpers/auth/jwt";

type JsonResponse = {
  ok: boolean;
  message: string;
  data: unknown;
};

export default async function login(req: NextApiRequest, res: NextApiResponse<JsonResponse>) {
  const { username, email, password, admin, is_admin } = req.body;

  if (req.method !== "POST") {
    return res.status(405).json({
      ok: false,
      message: "Method not allowed",
      data: null,
    });
  }

  try {
    const emailChecked = checkRegExp(email);

    db(process.env.MONGO_URI, res);

    if (admin !== process.env.ADMIN) {
      disconnectDB();

      return res.status(400).json({
        message: "No tiene permisos para crear un usario, contactese con el administrador",
        data: null,
        ok: false,
      });
    }

    if (!emailChecked) {
      disconnectDB();

      return res.status(400).json({
        ok: false,
        message: "email incorrecto",
        data: null,
      });
    }
    const usuario = await User.findOne({ email });

    if (usuario) {
      disconnectDB();

      return res.status(400).json({
        ok: false,
        message: "Un usuario existe con ese correo",
        data: null,
      });
    }

    const newUser = new User({
      username,
      email,
      password,
      is_admin,
    });

    const salt = bcrypt.genSaltSync();

    newUser.password = bcrypt.hashSync(password, salt);

    const token = await generateJwt(newUser._id, newUser.username);

    await newUser.save();

    req.headers.authorization = `${token}`;

    disconnectDB();

    return res.status(201).json({
      message: "User created",
      ok: true,
      data: { newUser, token },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      ok: false,
      message: "Se produjo un error a la hora de crear el usuario",
      data: null,
    });
  }
}
