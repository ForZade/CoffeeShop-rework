import multer from "multer";
import { Request, Response, NextFunction } from "express";

// Configure Multer to handle file uploads
const upload = multer({ storage: multer.memoryStorage() }); // Use memory storage for Base64 conversion

export const imageHandler = (req: Request, res: Response, next: NextFunction) => {
  if (!req.file) {
    return res.status(400).json({ error: "Image file is required." });
  }

  const allowedFormats = ["image/jpeg", "image/png", "image/jpg", "image/gif", "image/webp"];
  if (!allowedFormats.includes(req.file.mimetype)) {
    return res.status(400).json({ error: "Invalid image format. Only JPEG, PNG, and GIF are allowed." });
  }

  // Convert image buffer to Base64
  const base64Image = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;

  // Attach the Base64 string to the request object
  req.body.image = base64Image;

  next(); // Pass control to the next middleware or route handler
};

// Export Multer upload middleware
export const uploadMiddleware = upload.single("image");
