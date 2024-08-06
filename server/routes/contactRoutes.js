import express from "express";
import {
  createContact,
  getContacts,
} from "../controllers/contactController.js";

const router = express.Router();

router.post("/postcontact", createContact);
router.get("/getcontact", getContacts);

export default router;
