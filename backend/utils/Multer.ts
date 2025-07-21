import multer from "multer";
import { Request } from "express";
const multerStorage = multer.diskStorage({
  destination: (
    req: Request,
    _file: Express.Multer.File,
    cb: (err: Error | null, destination: string) => void,
  ) => {
    const userId = req.user?.id; // Assuming user ID is stored in req.user
    if (!userId) {
      return cb(new Error("User ID not found"), "");
    }
    const destination = `uploads/`;
    cb(null, destination);
  },
  filename: (
    _req: Request,
    file: Express.Multer.File,
    cb: (err: Error | null, filename: string) => void,
  ) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const filename = `${file.fieldname}-${uniqueSuffix}-${file.originalname}`;
    cb(null, filename);
  },
});

const upload = multer({ storage: multerStorage });

export default upload;
