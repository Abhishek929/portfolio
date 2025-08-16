import Contact from "../Models/contactModel.js";

// POST: Create a new contact entry
export const createContact = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, message } = req.body;

    if (!firstName || !lastName || !email) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const newContact = new Contact({
      firstName,
      lastName,
      email,
      phone,
      message
    });

    await newContact.save();
    res.status(201).json({ message: "Contact form submitted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// (Optional) GET: Retrieve all contacts (for admin)
export const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};