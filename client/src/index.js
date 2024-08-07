import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import "./index.css";
import "antd/dist/reset.css";
import "react-toastify/dist/ReactToastify.css";

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "font-awesome/css/font-awesome.min.css";
import { AuthProvider } from "./context/auth";
import { CartProvider } from "./context/cart";
import { CheckoutProvider } from "./context/checkout";
// Your Stripe public key
const stripePromise = loadStripe(
  "pk_test_51ORcH4L6KLdg6T2ndLB0iextSvsGZfIESd1eagjIkpram3tewxvR67pJU7BFbCWZu6R9Nd5QVEGmmuSdjerenjNL00OEamGWkn"
);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <AuthProvider>
    <CartProvider>
      <CheckoutProvider>
        <BrowserRouter>
          <Elements stripe={stripePromise}>
            <App />
          </Elements>
        </BrowserRouter>
      </CheckoutProvider>
    </CartProvider>
  </AuthProvider>
);

reportWebVitals();
