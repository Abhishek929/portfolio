import mongoose from "mongoose";

const authSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "user"], default: "user" },
    firstname: { type: String, default: "" },
    lastname: { type: String, default: "" },
    image: { type: String, default: "" },
    dob: { type: Date, default: null },
    address: { type: String, default: "" },
    phone: { type: String, default: "" },
    gender: { type: String, enum: ["male", "female", "other"], default: "other" },
});

const Auth = mongoose.models.Auth || mongoose.model("Auth", authSchema);

export default Auth;
