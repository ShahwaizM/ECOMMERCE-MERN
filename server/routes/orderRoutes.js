// server/routes/orderRoutes.js
import express from "express";
import {
  createOrderController,
  getAllOrdersController,
} from "../controllers/orderController.js";

const router = express.Router();

router.post("/create-order", createOrderController);
router.get("/get-orders", getAllOrdersController);

export default router;
