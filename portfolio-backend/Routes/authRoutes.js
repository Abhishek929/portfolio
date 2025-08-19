import express from 'express';
import {SignupUser, 
    LoginUser, 
    forgotPassword, 
    resetPassword, 
    GetUsers, 
    GetUserById, 
    UpdateUser, 
    DeleteUser } from '../Controllers/authController.js';
import checkDuplicateUsernameOrEmail from "../Middlewares/verifyUser.js";
import upload from '../Config/multer.js';

const router = express.Router();

// Register
router.post("/sign-up", checkDuplicateUsernameOrEmail, SignupUser);

// Login
router.post("/login", LoginUser);

// forgot password
router.post("/forgot-password", forgotPassword);

//reset password
router.post("/reset-password", resetPassword);

// Get all users
router.get("/get-users", GetUsers);

// Get user by ID
router.get("/get-user/:id", GetUserById);

// Update user
router.put("/update-user/:id", upload.single('image'), UpdateUser);

// Delete user
router.delete("/delete-user/:id", DeleteUser);

export default router;