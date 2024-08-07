import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import React from "react";
import "./Cart.css";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import Navbarr from "../components/navbar";
import Foote from "../components/footer";
import { useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const Cart = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [auth] = useAuth();
  const {
    cart,
    setCart,
    incrementItemQuantity,
    decrementItemQuantity,
    removeItemFromCart,
  } = useCart();

  const totalPrice = () => {
    try {
      return cart
        .reduce((total, item) => total + item.price * item.quantity, 0)
        .toLocaleString("en-US", {
          style: "currency",
          currency: "usd",
        });
    } catch (error) {
      console.log(error);
      return "0";
    }
  };

  // Make payment with Stripe
  const makePayment = async () => {
    const stripe = await loadStripe(
      "pk_test_51ORcH4L6KLdg6T2ndLB0iextSvsGZfIESd1eagjIkpram3tewxvR67pJU7BFbCWZu6R9Nd5QVEGmmuSdjerenjNL00OEamGWkn"
    );

    const body = { products: cart };
    const response = await fetch(
      "https://fashionhubserver.vercel.app/api/v1/stripe/create-checkout-session",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to create checkout session");
    }

    const session = await response.json();

    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.error(result.error.message);
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
                    <li className="active step0">Shopping Cart</li>
                    <li className="step0">Checkout</li>
                    <li className="step0">Finish</li>
                  </ul>
                </div>
                <div className="card-body p-0">
                  <h4 className="text-center">
                    {cart?.length
                      ? `You have ${cart.length} item(s) in your cart ${
                          auth?.token ? "" : "please login to checkout"
                        }`
                      : "Your cart is empty"}
                  </h4>
                  <div className="row g-0">
                    <div className="col-lg-8 cart-details">
                      <div className="p-2">
                        <div className="d-flex justify-content-between align-items-center mb-5">
                          <h1 className="fw-bold mb-0">Shopping Cart</h1>
                        </div>
                        {cart?.map((p) => (
                          <div
                            key={p._id}
                            className="row mb-4 d-flex justify-content-between align-items-center"
                          >
                            <div className="col-md-2 col-lg-2 col-xl-2">
                              <img
                                src={`https://fashionhubserver.vercel.app/api/v1/product/product-photo/${p._id}`}
                                className="img-fluid rounded-3"
                                alt={p.name}
                              />
                            </div>
                            <div className="col-md-3 col-lg-3 col-xl-3">
                              <h6 className="text-muted">{p.name}</h6>
                              <h6 className="mb-0">
                                {p.description.substring(0, 30)}
                              </h6>
                            </div>
                            <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
                              <button
                                className="btn btn-link px-2"
                                onClick={() => decrementItemQuantity(p._id)}
                              >
                                <FontAwesomeIcon icon={faMinus} />
                              </button>

                              <input
                                value={p.quantity}
                                type="number"
                                readOnly
                                className="form-control form-control-sm"
                              />

                              <button
                                className="btn btn-link px-2"
                                onClick={() => incrementItemQuantity(p._id)}
                              >
                                <FontAwesomeIcon icon={faPlus} />
                              </button>
                            </div>
                            <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                              <h6 className="mb-0">
                                {(p.price * p.quantity).toLocaleString(
                                  "en-US",
                                  {
                                    style: "currency",
                                    currency: "usd",
                                  }
                                )}
                              </h6>
                            </div>
                            <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                              <a
                                onClick={() => removeItemFromCart(p._id)}
                                className="text-muted"
                              >
                                <FontAwesomeIcon icon={faTimes} />
                              </a>
                            </div>
                          </div>
                        ))}
                        <h4 style={{ textAlign: "right" }}>
                          Total: {totalPrice()}
                        </h4>
                        <div className="pt-5">
                          <h6 className="mb"></h6>
                          <div className="bottom">
                            {cart?.length ? (
                              <button
                                onClick={() => navigate("/checkout")}
                                className="btn btn-primary"
                              >
                                Next
                              </button>
                            ) : (
                              <button
                                className="btn btn-primary"
                                onClick={() => navigate("/store")}
                              >
                                <i className="fa fa-long-arrow-alt-left me-2"></i>
                                Back to shop
                              </button>
                            )}
                          </div>
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

export default Cart;
