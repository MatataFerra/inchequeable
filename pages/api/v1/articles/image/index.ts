import type { NextApiRequest, NextApiResponse } from "next";
import { v2 as cloudinary } from "cloudinary";
import formidable from "formidable";

cloudinary.config(process.env.CLOUDINARY_URL || "");

// TODO: Implement API for upload images to cloudinary

type Data = {
  message: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method !== "POST") {
    return res.status(405).end("Method Not Allowed");
  }

  console.log("entered upload image api");

  return uploadFiles(req, res);
}

const uploadFiles = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const imageUrl = await parseFiles(req);

  console.log("🚀 ~ file: index.ts:23 ~ uploadFiles ~ imageUrl", imageUrl);

  return res.status(200).json({ message: imageUrl });
};

const saveFile = async (file: formidable.File): Promise<string> => {
  const { secure_url } = await cloudinary.uploader.upload(file.filepath);

  console.log("🚀 ~ file: index.ts:31 ~ saveFile ~ file.filepath", file.filepath);
  console.log("🚀 ~ file: index.ts:31 ~ saveFile ~ secure_url", secure_url);

  return secure_url;
};

const parseFiles = async (req: NextApiRequest): Promise<string> => {
  return new Promise((resolve, reject) => {
    const form = new formidable.IncomingForm();

    form.parse(req, async (err, fields, files) => {
      if (err) {
        reject(err);
      }

      const filePath = await saveFile(files.file as formidable.File);

      console.log("🚀 ~ file: index.ts:48 ~ form.parse ~ files.file", files.file);
      console.log("🚀 ~ file: index.ts:48 ~ form.parse ~ filePath", filePath);

      resolve(filePath);
    });
  });
};
