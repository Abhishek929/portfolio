import express from 'express';
import upload from '../Middlewares/multer.js';
import { CreateUser, UpdateUser, DeleteUser, GetUsers, GetUserById } from '../Controllers/USERController.js';

const router = express.Router();

router.post("/", CreateUser);
router.get("/", GetUsers);
router.get("/:id", GetUserById);

// Use multer here
router.put("/:id", upload.single("image"), UpdateUser); 

router.delete("/:id", DeleteUser);

export default router;
