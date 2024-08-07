import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";
import { useCart } from "../context/cart";
import { useCheckout } from "../context/checkout";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Navbarr from "../components/navbar";
import Foote from "../components/footer";
import "./Checkout.css";
const stripePromise = loadStripe(
  "pk_test_51ORcH4L6KLdg6T2ndLB0iextSvsGZfIESd1eagjIkpram3tewxvR67pJU7BFbCWZu6R9Nd5QVEGmmuSdjerenjNL00OEamGWkn"
);

const CheckoutPage = () => {
  const [auth] = useAuth();
  const { cart } = useCart();
  const { setCheckoutData } = useCheckout(); // Use setCheckoutData here
  const [formData, setFormData] = useState({
    name: auth.user?.name || "",
    email: auth.user?.email || "",
    phone: auth.user?.phone || "",
    address: auth.user?.address || "",
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const combinedData = {
      ...formData,
      userId: auth.user?._id,
      products: cart,
    };

    setCheckoutData(combinedData);

    localStorage.setItem("checkoutData", JSON.stringify(combinedData));
    console.log("Combined Data Set in Context:", combinedData);

    try {
      const response = await fetch(
        "https://fashionhubserver.vercel.app/api/v1/stripe/create-checkout-session",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(combinedData),
        }
      );

      const data = await response.json();
      const { id } = data;
      const stripe = await stripePromise;

      const { error } = await stripe.redirectToCheckout({ sessionId: id });

      if (error) {
        console.error("Stripe checkout error:", error);
      }
    } catch (error) {
      console.error("Error initiating payment:", error);
    }
  };

  return (
    <>
      <div className="container-fluid product-detail">
        <div className=" container ">
          <Navbarr />
        </div>
      </div>
      <section className="h-100 h-custom">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12">
              <div className="card card-registration card-registration-2">
                <div className="p-card card">
                  <ul id="progressbar" className="text-center">
                    <li className=" active step0">Shopping Cart</li>
                    <li className="active step0">Checkout</li>
                    <li className="step0">Finish</li>
                  </ul>
                </div>
                <div className="card-body p-0">
                  <div className="row g-0">
                    <div className="col-lg-8 cart-details">
                      <div className="p-2">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <h1 className="fw-bold mb-0">CheckOut Form</h1>
                        </div>

                        <div className="p-2">
                          <form onSubmit={handleSubmit}>
                            <div class="form-group ">
                              <label>Name</label>
                              <input
                                class="form-input form-control checkout-input"
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="Name"
                                required
                              />
                            </div>
                            <div class="form-group">
                              <label>Email</label>
                              <input
                                class="form-input form-control checkout-input"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="Email"
                                required
                              />
                            </div>
                            <div class="form-group">
                              <label>Phone</label>
                              <input
                                class="form-input form-control checkout-input"
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                placeholder="Phone"
                                required
                              />
                            </div>
                            <div class="form-group">
                              <label>Address</label>
                              <input
                                class="form-input form-control checkout-input"
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                                placeholder="Address"
                                required
                              />
                            </div>
                            <div className="bottom">
                              <button
                                onClick={() => navigate("/cart")}
                                className="btn btn-primary"
                              >
                                back
                              </button>{" "}
                              {}
                              <button className="btn btn-primary" type="submit">
                                Next
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Foote />
    </>
  );
};

export default () => (
  <Elements stripe={stripePromise}>
    <CheckoutPage />
  </Elements>
);
