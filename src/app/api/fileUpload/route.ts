import { NextRequest, NextResponse } from "next/server";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import sharp from "sharp";

const s2 = new S3Client({
  region: "auto",
  endpoint: process.env.S3_ENDPOINT ?? "",
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_ACCESS_ID ?? "",
    secretAccessKey: process.env.CLOUDFLAR_SECRET ?? "",
  },
});

export const POST = async (req: NextRequest) => {
  const formData = await req.formData();
  const file: File | null = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ success: false, message: "No file uploaded" }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const fileName = `${Date.now()}-${file.name.split(".")[0]}.webp`; // Pastikan formatnya WebP

  try {
    const webpBuffer = await sharp(buffer)
      .webp({ quality: 100 }) 
      .toBuffer();

    const putObjectCommand = new PutObjectCommand({
      Bucket: process.env.S3_BUCKET ?? "",
      Key: fileName,
      Body: webpBuffer,
      ContentType: "image/webp",
      ACL: "public-read",
    });

    await s2.send(putObjectCommand);

    const fileUrl = `${process.env.CDN_URL ?? process.env.S3_ENDPOINT}/${fileName}`;
    console.log(fileUrl);

    return NextResponse.json(
      {
        success: true,
        url: fileUrl,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error uploading file", error);
    return NextResponse.json(
      { success: false, message: "Upload failed" },
      { status: 500 }
    );
  }
};
