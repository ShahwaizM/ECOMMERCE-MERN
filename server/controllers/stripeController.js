import Stripe from "stripe";
const key = process.env.STRIPE_SECRET_KEY;
const stripe = new Stripe(key);
const url = "https://fashionhub-five.vercel.app/";

export const createCheckoutSession = async (req, res) => {
  try {
    const { userId, products, ...formData } = req.body;

    // Validate that all required fields are present
    if (!products || !formData) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    if (!Array.isArray(products) || products.length === 0) {
      return res
        .status(400)
        .json({ error: "Products array is required and cannot be empty" });
    }

    // Ensure each product has required fields
    const lineItems = products.map((product) => {
      if (!product.name || !product.price || !product.quantity) {
        throw new Error("Invalid product data");
      }

      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: product.name,
          },
          unit_amount: product.price * 100, // amount in cents
        },
        quantity: product.quantity,
      };
    });

    // Create Checkout Sessions from the request body
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${url}/success`,
      cancel_url: `${url}/cancel`,
      metadata: {
        userId,
        ...formData,
      }, // Store userId and formData in session metadata
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error("Error creating checkout session:", error.message);
    res.status(500).json({ error: error.message });
  }
};
