import express from 'express';
import { CreateUser, UpdateUser, DeleteUser, GetUsers, GetUserById } from '../Controllers/USERController.js';

const router = express.Router();

// Create user
router.post("/", CreateUser);

// Get all users
router.get("/", GetUsers);

// Get single user
router.get("/:id", GetUserById);

// Update user (optional: remove this if you already use AuthRoutes for update)
router.put("/:id", UpdateUser);

// Delete user
router.delete("/:id", DeleteUser);

export default router;
