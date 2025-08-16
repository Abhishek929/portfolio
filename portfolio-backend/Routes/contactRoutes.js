import express from "express";
import { createContact, getAllContacts } from "../Controllers/contactController.js";

const router = express.Router();

// Public: Create contact
router.post("/create", createContact);

// Admin only: Get all contacts
router.get("/all-contacts", getAllContacts);

export default router;