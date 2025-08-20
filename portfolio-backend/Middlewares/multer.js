import multer from "multer";

const storage = multer.memoryStorage(); // keep in memory, no /uploads

const upload = multer({ storage });

export default upload;
