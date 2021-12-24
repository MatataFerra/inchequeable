import mongoose, { ConnectOptions } from "mongoose";
import { NextApiResponse } from "next";

export const db = async (uri: string, res: NextApiResponse) => {
  const options: ConnectOptions = {
    dbName: "inchequeable",
  };

  try {
    const connection = await mongoose.connect(uri, options);

    if (mongoose.connection.readyState === 1) {
      console.log("Already connected to database");

      return;
    }

    if (connection) {
      console.log("MongoDB connected");

      return connection;
    } else if (!connection) {
      disconnectDB();

      return res.status(500).json({
        ok: false,
        message: "Internal server error",
        data: null,
      });
    }
  } catch (error) {
    console.log(error);

    return {
      message: "Ha ocurrido un error al conectar con MongoDB",
      ok: false,
      data: null,
    };
  }
};

export const disconnectDB = async () => {
  try {
    await mongoose.disconnect();

    console.log("MongoDB disconnected");

    return;
  } catch (error) {
    console.log(error);

    return {
      message: "Ha ocurrido un error al desconectar con MongoDB",
      ok: false,
      data: null,
    };
  }
};

export const connectDBWithoutRes = async (uri: string) => {
  const options: ConnectOptions = {
    dbName: "inchequeable",
  };

  try {
    const connection = await mongoose.connect(uri, options);

    if (connection) {
      console.log("MongoDB connected");

      return connection;
    } else if (!connection) {
      disconnectDB();

      return {
        ok: false,
        message: "Internal server error",
        data: null,
      };
    }
  } catch (error) {
    console.log(error);

    return {
      message: "Ha ocurrido un error al conectar con MongoDB",
      ok: false,
      data: null,
    };
  }
};
