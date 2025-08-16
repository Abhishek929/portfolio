import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const mongo_url = process.env.MONGODB_CONN;

const connectDB = async () => {
    try {
        await mongoose.connect(mongo_url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected to MongoDB successfully.");
    } catch (error) {
        console.error("MongoDB connection failed:", error);
        process.exit(1);
    }
};

mongoose.connection.on("error", (err) => {
    console.error("Mongoose connection error:", err);
});

export default connectDB;
