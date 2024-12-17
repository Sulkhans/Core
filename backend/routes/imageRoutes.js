import express from "express";
import formidable from "formidable";
import path from "path";
import fs from "fs/promises";
import {
  authenticate,
  authenticateAdmin,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authenticate, authenticateAdmin, (req, res) => {
  const form = formidable({
    keepExtensions: true,
    uploadDir: path.join(process.cwd(), "uploads"),
    maxFiles: 4,
    maxFileSize: 5 * 1024 * 1024,
    filter: ({ mimetype }) => {
      const allowedTypes = ["image/jpeg", "image/png"];
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
    if (!files.images) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    const uploadedImages = files.images.map(
      (img) => `/uploads/${img.newFilename}`
    );
    res.json({
      message: "File uploaded successfully",
      images: uploadedImages,
    });
  });
});

router.delete("/:img", authenticate, authenticateAdmin, async (req, res) => {
  try {
    const { img } = req.params;
    const filePath = path.join(process.cwd(), "uploads", img);
    try {
      await fs.access(filePath);
    } catch (error) {
      return res.status(404).json({ message: "File not found" });
    }
    await fs.unlink(filePath);
    res.json({ message: "File deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
