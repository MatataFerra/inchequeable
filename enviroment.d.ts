declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SECRET_KEY: string;
      ADMIN: string;
      MONGO_URI: string;
      NODE_ENV: "development" | "production";
      NEXT_PUBLIC_DOMAIN: string;
      DOMAIN: string;
      PORT?: string;
      PWD: string;
    }
  }
}

export {};
