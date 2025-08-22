import multer from "multer";

const storage = multer.memoryStorage(); // keep in memory, no /uploads

const upload = multer({ storage, limits: { fileSize: 50 * 1024 * 1024 } }); // 50MB limit

export default upload;
