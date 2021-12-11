import mongoose, { ConnectOptions } from "mongoose";

export const db = async (uri: string) => {
  const options: ConnectOptions = {
    dbName: "inchequeable",
  };

  try {
    const connection = await mongoose.connect(uri, options);

    // connection.useDb("inchequeable", { noListener: true, useCache: true });

    if (connection) {
      console.log("MongoDB connected");

      return connection;
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
