import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String },
    message: { type: String }
  }
);

const Contact = mongoose.models.Contact || mongoose.model("Contact", contactSchema);

export default Contact;