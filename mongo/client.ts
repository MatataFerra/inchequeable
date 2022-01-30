import mongoose, { ConnectOptions } from "mongoose";
import { NextApiResponse } from "next";

let countConnections: number = 0;

export const db = async (uri: string, res: NextApiResponse) => {
  const options: ConnectOptions = {
    dbName: "inchequeable",
  };

  try {
    if (mongoose.connection.readyState === 1) {
      countConnections++;
      console.info(`Already connected to database, count: ${countConnections}`);

      return;
    }

    const connection = await mongoose.connect(uri, options);

    if (connection) {
      console.info("MongoDB connected");

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
    console.error(error);

    return {
      message: "Ha ocurrido un error al conectar con MongoDB",
      ok: false,
      data: null,
    };
  }
};

export const disconnectDB = async () => {
  try {
    await mongoose.connection.close();

    console.info("MongoDB disconnected");
  } catch (error) {
    console.error(error);

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
      console.info("MongoDB connected");

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
    console.error(error);

    return {
      message: "Ha ocurrido un error al conectar con MongoDB",
      ok: false,
      data: null,
    };
  }
};
