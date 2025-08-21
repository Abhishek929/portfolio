import multer from "multer";
import path from "path";

// configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads"); // folder to store files
  },
  filename: (req, file, cb) => {
    // use timestamp + original extension
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// multer instance
const upload = multer({ storage });

export default upload;
