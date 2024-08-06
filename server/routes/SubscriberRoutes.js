// routes/subscriber.js
import express from "express";
import {
  getSubscribersController,
  subscribeController,
} from "../controllers/subscriberController.js";
const router = express.Router();

router.post("/subscribe", subscribeController);
router.get("/getsubscribers", getSubscribersController);
export default router;
