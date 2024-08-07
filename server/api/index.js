import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "../config/db.js";
import authRoutes from "../routes/authRoute.js";
import categoryRoutes from "../routes/categoryRoutes.js";
import productRoutes from "../routes/productRoutes.js";
import cors from "cors";
import bodyParser from "body-parser";
import SubscriberRoutes from "../routes/SubscriberRoutes.js";
import ContactRoutes from "../routes/contactRoutes.js";
import stripeRoutes from "../routes/stripeRoutes.js";
import orderRoutes from "../routes/orderRoutes.js";
//configure env
dotenv.config();

//databse config
connectDB();

//rest object
const app = express();

//middelwares
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.json());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(express.json());

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/subscriber", SubscriberRoutes);
app.use("/api/v1/contact", ContactRoutes);
app.use("/api/v1/stripe", stripeRoutes);
app.use("/api/v1/order", orderRoutes);

//rest api
app.get("/", (req, res) => {
  res.send("<h1>Welcome to ecommerce app</h1>");
});

//PORT
const PORT = process.env.PORT || 8080;

//run listen
app.listen(PORT, () => {
  console.log(`Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`);
});
