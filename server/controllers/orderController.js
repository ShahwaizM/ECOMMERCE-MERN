import orderModel from "../models/orderModel.js";
import nodemailer from "nodemailer";

// Set up NodeMailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "shahwaizmughal02@gmail.com",
    pass: process.env.PASS,
  },
});

export const createOrderController = async (req, res) => {
  try {
    const { userId, name, email, phone, address, products } = req.body;

    if (!userId || !name || !email || !address || !products) {
      return res.status(400).send({ message: "Missing required fields" });
    }

    // Transform products array to match the expected schema
    const transformedProducts = products.map((p) => ({
      productId: p._id,
      quantity: p.quantity,
      price: p.price,
    }));

    // Validate the transformed products
    if (
      !Array.isArray(transformedProducts) ||
      transformedProducts.some((p) => !p.productId || !p.quantity || !p.price)
    ) {
      return res.status(400).send({ message: "Invalid products array" });
    }

    const order = new orderModel({
      userId,
      name,
      email,
      phone,
      address,
      products: transformedProducts,
    });

    await order.save();

    const mailOptions = {
      from: "shahwaizmughal02@gmail.com",
      to: email,
      subject: "Order Placement",
      text: "Thank you for Trusting Us. Your order will be received soon.",
    };

    // Send confirmation email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        // Only send a response if it hasn't been sent already
        if (!res.headersSent) {
          return res.status(500).send({
            success: false,
            message: "Failed to send confirmation email.",
          });
        }
      } else {
        // Only send a response if it hasn't been sent already
        if (!res.headersSent) {
          return res.status(200).send({
            success: true,
            message: "Subscription successful! Confirmation email sent.",
          });
        }
      }
    });

    // Send the order response after saving the order
    if (!res.headersSent) {
      res.status(201).json(order);
    }
  } catch (error) {
    console.error("Error creating order:", error);
    if (!res.headersSent) {
      res.status(500).json({ error: "Failed to create order" });
    }
  }
};

export const getAllOrdersController = async (req, res) => {
  try {
    const orders = await orderModel.find({});

    res.json({ success: true, orders });
  } catch (error) {
    console.error("Error while getting all orders:", error);
    res.status(500).send({
      success: false,
      message: "Error while getting all orders",
      error,
    });
  }
};
