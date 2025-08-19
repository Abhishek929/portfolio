import Auth from "../Models/authModels.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

const JWT_SECRET = process.env.JWT_SECRET || "yoursecretkey"; // Keep this in .env

// REGISTER USER
export const SignupUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Password validation
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/;
        if (!passwordRegex.test(password)) {
            return res.status(400).json({
                message: "Password must be at least 8 characters long, contain an uppercase letter, a number, and a special symbol."
            });
        }

        // First registered user becomes admin
        const totalUsers = await Auth.countDocuments();
        const role = totalUsers === 0 ? "admin" : "user";

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Save new user
        const user = new Auth({ username, email, password: hashedPassword, role });
        await user.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// LOGIN USER
export const LoginUser = async (req, res) => {
    try {
        const { identifier, password, role } = req.body;

        // Find user by username or email
        const user = await Auth.findOne({
            $or: [{ email: identifier }, { username: identifier }]
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check role
        if (role && Auth.role !== role) {
            return res.status(403).json({ message: "Access denied" });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Create JWT Token
        const token = jwt.sign(
            { id: user._id, email: user.email, username: user.username, role: user.role },
            process.env.JWT_SECRET || "yoursecretkey",
            { expiresIn: "1h" }
        );

        res.json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Forgot password - send reset link by email
export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        // Find user
        const existingUser = await Auth.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }

        // Create JWT Token (valid for 15 minutes)
        const token = jwt.sign(
            { id: existingUser._id, email: existingUser.email },
            process.env.JWT_SECRET || "yoursecretkey",
            { expiresIn: "15m" }
        );

        const resetLink = `https://portfolio-abhi-six.vercel.app/reset-password?token=${token}`;

        // Nodemailer setup (Gmail example)
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER, // Your Gmail
                pass: process.env.EMAIL_PASS  // App password, NOT your normal password
            }
        });

        // Email options
        const mailOptions = {
            from: `"Portfolio Support" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Password Reset Request",
            html: `
                <!DOCTYPE html>
                <html lang="en">
                    <head>
                        <meta charset="UTF-8" />
                        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                        <title>Password Reset</title>
                    </head>
                    <body style="margin:0; padding:0; font-family: Arial, Helvetica, sans-serif; background-color:#f4f4f7;">

                        <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#f4f4f7">
                            <tr>
                                <td align="center">
                                    <table width="600" border="0" cellspacing="0" cellpadding="40" style="background:#ffffff; border-radius:8px; margin-top:40px; box-shadow:0 4px 8px rgba(0,0,0,0.05);">
                                        <tr>
                                            <td align="center" style="padding:20px 40px; border-bottom:1px solid #eee;">
                                                <h2 style="margin:0; color:#333;">🔒 Password Reset Request</h2>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="padding:30px 40px; color:#555; font-size:15px; line-height:1.6;">
                                                <p style="margin:0 0 15px 0;">Hello <strong>${existingUser.username}</strong>,</p>
                                                <p style="margin:0 0 20px 0;">We received a request to reset your password. Please click the button below to set up a new one:</p>
                                                <p style="text-align:center; margin:30px 0;">
                                                    <a href="${resetLink}" target="_blank" rel="noopener noreferrer" style="background:#4f46e5; color:#ffffff; padding:12px 24px; text-decoration:none; font-weight:bold; border-radius:6px; display:inline-block;">Reset Password</a>
                                                </p>
                                                <p style="margin:0 0 10px 0;">⚠️ This link will expire in <strong>15 minutes</strong>.</p>
                                                <p style="margin:0;">If you didn’t request a password reset, you can safely ignore this email.</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="background:#f9fafb; padding:20px 40px; font-size:12px; color:#999; text-align:center; border-top:1px solid #eee;">
                                                <p style="margin:0;">© ${new Date().getFullYear()} Your Company. All rights reserved.</p>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </body>
                </html>`
        };

        // Send email
        await transporter.sendMail(mailOptions);

        res.json({ message: "Password reset link sent to email" });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const resetPassword = async (req, res) => {
    try {
        const { password } = req.body;
        const { token } = req.query; // ✅ Get token from URL query string

        if (!token) {
            return res.status(400).json({ message: "Token is required" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || "yoursecretkey");
        const user = await Auth.findById(decoded.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.password = await bcrypt.hash(password, 10);
        await user.save();

        res.json({ message: "Password reset successful" });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get all users
export const GetUsers = async (req, res) => {
    try {
        const users = await Auth.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get user by ID
export const GetUserById = async (req, res) => {
    try {
        const user = await Auth.findById(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update user
export const UpdateUser = async (req, res) => {
  try {
    // Find the user by ID
    const user = await Auth.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Update allowed fields
    const { username, email, role } = req.body;

    if (username) user.username = username;
    if (email) user.email = email;

    // Role update only if requester is admin
    if (role) {
        user.role = role;
    }

    // Save the updated user 
    await user.save();

    // Return the updated user
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete user
export const DeleteUser = async (req, res) => {
    try {
        const user = await Auth.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json({ message: "User deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};