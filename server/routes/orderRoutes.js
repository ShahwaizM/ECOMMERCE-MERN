// server/routes/orderRoutes.js
import express from "express";
import {
  createOrderController,
  getAllOrdersController,
  getOrdersController,
  orderStatusController,
} from "../controllers/orderController.js";

const router = express.Router();

router.post("/create-order", createOrderController);
router.get("/get-orders", getAllOrdersController);
router.get("/orders", getOrdersController);

// order status update
router.put(
  "/order-status/:orderId",

  orderStatusController
);
export default router;
