import contactModel from "../models/contactModel.js";
export const createContact = async (req, res) => {
  try {
    const contact = new contactModel(req.body);
    await contact.save();
    res.status(201).send(contact);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get all contacts
export const getContacts = async (req, res) => {
  try {
    const contacts = await contactModel.find({});
    res.status(200).json({
      success: true,
      contacts,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};
