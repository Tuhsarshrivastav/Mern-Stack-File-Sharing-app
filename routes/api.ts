import express from "express";
import File from "../models/Model";
import multer from "multer";
// import https from "https";
import { UploadApiResponse, v2 as cloudinary } from "cloudinary";
const storage = multer.diskStorage({});
const router = express.Router();
let upload = multer({
  storage,
});

router.post("/upload", upload.single("myFile"), async (req, res) => {
  try {
    if (!req.file)
      return res.status(400).json({ message: "Hey bro! We need the file" });

    let uploadedFile: UploadApiResponse;
    try {
      uploadedFile = await cloudinary.uploader.upload(req.file.path, {
        folder: "sharemeYT",
        resource_type: "auto",
      });
    } catch (error) {
      console.log(error.message);

      return res.status(400).json({ message: "Cloudinary Error" });
    }
    const { originalname } = req.file;
    const { secure_url, bytes, format } = uploadedFile;

    const file = await File.create({
      filename: originalname,
      sizeInBytes: bytes,
      secure_url,
      format,
    });
    res.status(200).json({
      id: file._id,
      downloadPageLink: `${process.env.API_BASE_ENDPOINT_CLIENT}download/${file._id}`,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server Error :(" });
  }
});

export default router;
