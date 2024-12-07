import express from "express";
import formidable from "formidable";
import path from "path";
import {
  authenticate,
  authenticateAdmin,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authenticate, authenticateAdmin, (req, res) => {
  const form = formidable({
    keepExtensions: true,
    uploadDir: path.join(process.cwd(), "uploads"),
    maxFiles: 1,
    maxFileSize: 5 * 1024 * 1024,
    filter: ({ mimetype }) => {
      const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
      return allowedTypes.includes(mimetype);
    },
  });

  form.parse(req, (err, fields, files) => {
    if (err) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(413).json({ message: "File too large" });
      }
      return res.status(500).json({ message: "Upload failed" });
    }
    if (!files.image) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    const img = files.image[0];
    res.json({
      message: "File uploaded successfully",
      image: `/uploads/${img.newFilename}`,
    });
  });
});

export default router;
