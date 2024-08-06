// controllers/subscriberController.js
import nodemailer from "nodemailer";
import newsletterModel from "../models/newsletterModel.js";
// Set up NodeMailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "shahwaizmughal02@gmail.com",
    pass: process.env.PASS,
  },
});

export const subscribeController = async (req, res) => {
  const { email } = req.body;

  try {
    const subscriber = await new newsletterModel({ email }).save();
    await subscriber.save();

    const mailOptions = {
      from: "shahwaizmughal02@gmail.com",
      to: email,
      subject: "Newsletter Subscription Confirmation",
      text: "Thank you for subscribing to our newsletter!",
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        return res.status(500).send({
          success: false,
          message: "Failed to send confirmation email.",
        });
      } else {
        return res.status(200).send({
          success: true,
          message: "Subscription successful! Confirmation email sent.",
        });
      }
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ success: false, message: "Subscription failed.", error });
  }
};
// Controller to get all subscribers
export const getSubscribersController = async (req, res) => {
  try {
    const subscribers = await newsletterModel.find({});
    res.status(200).send({
      success: true,
      subscribers,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error fetching subscribers",
      error,
    });
  }
};
