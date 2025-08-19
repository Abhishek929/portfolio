import express from "express";
import dotenv from "dotenv";
import userRouter from "./Routes/userRoutes.js";
import authRouter from "./Routes/authRoutes.js";
import connectDB from "./Config/db_connect.js";
import cors from "cors";
import contactRoutes from "./Routes/contactRoutes.js";
import path from "path";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// CORS Middleware
app.use(cors({
    origin: "https://portfolio-abhi-six.vercel.app", // no trailing slash
    credentials: true, // if you need cookies/authorization headers
}));

app.use(express.json());

// Connect to DB
connectDB();

// Routes
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/contact", contactRoutes);
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.get("/", (req, res) => {
    res.send("Welcome to the Portfolio Backend API");
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

