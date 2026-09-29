import multer from "multer";

export const Upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 3 * 1024 * 1024, //3MB
  },
});