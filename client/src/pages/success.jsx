import React, { useEffect, useState } from "react";
import { useCheckout } from "../context/checkout";
import { useAuth } from "../context/auth";
import { useCart } from "../context/cart";
import { useNavigate } from "react-router-dom";
import "./Success.css";
import Navbarr from "../components/navbar";
import Foote from "../components/footer";

const Success = () => {
  const { checkoutData, setCheckoutData } = useCheckout();
  const [auth] = useAuth();
  const { cart, clearCart } = useCart();
  const [orderCreated, setOrderCreated] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if checkoutData is empty, and load from localStorage if needed
    if (!checkoutData || Object.keys(checkoutData).length === 0) {
      const savedCheckoutData = JSON.parse(
        localStorage.getItem("checkoutData")
      );

      if (savedCheckoutData) {
        setCheckoutData(savedCheckoutData);
      } else {
        console.error("No checkout data available in context or localStorage");
      }
    }
  }, [checkoutData, setCheckoutData]);

  useEffect(() => {
    const createOrder = async () => {
      try {
        const response = await fetch(
          "https://fashionhubserver.vercel.app/api/v1/order/create-order",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              userId: auth.user?._id,
              ...checkoutData,
              products: cart,
            }),
          }
        );

        const data = await response.json();
        if (data._id) {
          clearCart();
          setOrderCreated(true);
        } else {
          console.error("Failed to create order");
          setError("Failed to create order.");
        }
      } catch (error) {
        console.error("Error creating order:", error);
        setError("An error occurred while creating the order.");
      }
    };

    // Only create order if checkoutData is present and not already created
    if (checkoutData && Object.keys(checkoutData).length > 0 && !orderCreated) {
      createOrder();
    }
  }, [checkoutData, auth.user, cart, clearCart, orderCreated]);

  return (
    <div>
      <div className="container-fluid product-detail">
        <div className="container">
          <Navbarr />
        </div>
      </div>
      {orderCreated ? (
        <div className="container-fluid thanku">
          <div className="container">
            <div className="respo">
              <div className="mail">
                <i className="icon fa fa-envelope"></i>
              </div>
              <h1>Thanks for Shopping!</h1>
              <p className="thank-you">Your Order Will reach you soon</p>
              <button
                className="centered-button"
                onClick={() => navigate("/store")}
              >
                Do More Shopping
              </button>
            </div>
          </div>
        </div>
      ) : error ? (
        <h1>{error}</h1>
      ) : (
        <h1>Payment Successful. Creating your order...</h1>
      )}
      <Foote />
    </div>
  );
};

export default Success;
