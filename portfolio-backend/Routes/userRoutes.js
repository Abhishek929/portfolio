import express from 'express';
import {CreateUser,
    UpdateUser,
    DeleteUser,
    GetUsers,
    GetUserById } from '../Controllers/USERController.js';

const router = express.Router();

// Create
router.post("/", CreateUser);

// Read (all)
router.get("/", GetUsers);

// Read (one)
router.get("/:id", GetUserById);

// Update
router.patch("/:id", UpdateUser);

// Delete
router.delete("/:id", DeleteUser);

export default router;
