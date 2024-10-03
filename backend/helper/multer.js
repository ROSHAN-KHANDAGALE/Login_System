// helper/multer.js
import multer from "multer";
import path from "path";
import { messages } from "../config/constants";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./profile_picture");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
  if (!allowedTypes.includes(file.mimetype)) {
    return cb(new Error(messages.imageType)); // Adjust error message as needed
  }
  cb(null, true);
};

export const uploadMiddleware = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, 
});
