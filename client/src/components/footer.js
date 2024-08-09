import React, { useState } from "react";

import { Navbar, Nav, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faMapMarker,
  faMapMarkedAlt,
  faEnvelope,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faInstagram,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

const Foote = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://fashionhubserver.vercel.app/api/v1/subscriber/subscribe",
        { email }
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage("Subscription failed. Please try again.");
      console.error(error);
    }
  };

  const navigate = useNavigate();
  return (
    <div class="container-fluid footer">
      <div class="subscribe container ">
        <div class="row">
          <div class="col-md-6 subscribe1 ">
            <h3>SUBSCRIBE TO GET </h3>
            <h3>OUR LATEST UPDATES</h3>
          </div>
          <div class="col-md-6 subscribe1 ">
            <form className="newsletter-form" onSubmit={handleSubmit}>
              <div class="input-box wed">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  class="form-control"
                  id="email"
                  placeholder="Enter your email"
                />
                <button type="submit" className="email-btn">
                  Sign Up
                </button>
              </div>
            </form>
            {/* <!-- Add a container for displaying success or error messages --> */}
            <div id="newsletter-messages">{message && <p>{message}</p>}</div>
          </div>
        </div>
      </div>

      <div class="container">
        <div class="row footer2">
          <div class="col-md-3">
            <h2>FashionHub</h2>
            <br></br>
            <ul class="list-inline social-icons">
              <li class="list-inline-item">
                <a
                  onClick={() => navigate("https://www.facebook.com")}
                  target="_blank"
                >
                  <FontAwesomeIcon icon={faFacebook} />
                </a>
              </li>
              <li class="list-inline-item">
                <a
                  onClick={() => navigate("https://twitter.com")}
                  target="_blank"
                >
                  <FontAwesomeIcon icon={faTwitter} />
                </a>
              </li>
              <li class="list-inline-item">
                <a
                  onClick={() => navigate("https://instagram.com")}
                  target="_blank"
                >
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
              </li>
              <li class="list-inline-item">
                <a
                  onClick={() => navigate("https://youtube.com")}
                  target="_blank"
                >
                  <FontAwesomeIcon icon={faYoutube} />
                </a>
              </li>
            </ul>
          </div>
          <div class="col-md-3">
            <h2>NAVIGATIONS</h2>
            <ul class="list">
              <li class="list-item">
                <a onClick={() => navigate("/")}>HOME</a>
              </li>
              <li class="list-item">
                <a onClick={() => navigate("/store")}>STORE</a>
              </li>
              <li class="list-item">
                <a onClick={() => navigate("/about")}>ABOUT</a>
              </li>
              <li class="list-item">
                <a onClick={() => navigate("/contact")}>CONTACT</a>
              </li>
              <li class="list-item">
                <a onClick={() => navigate("/cart")}>
                  CART <FontAwesomeIcon icon={faShoppingCart} />
                </a>
              </li>
            </ul>
          </div>
          <div class="col-md-3">
            <h3>CONTACT</h3>
            <ul class="list">
              <li class="list-item">
                <a onClick={() => navigate("tel:+353873671286")}>
                  <FontAwesomeIcon icon={faPhone} /> +999999999999
                </a>
              </li>
              <li class="list-item">
                <a onClick={() => navigate("tel:+353873671286")}>
                  <FontAwesomeIcon icon={faPhone} /> +999999999999
                </a>
              </li>
              <li class="list-item">
                <a onClick={() => navigate("mailto:FashionHub@gmail.com")}>
                  <FontAwesomeIcon icon={faEnvelope} /> FashionHub@gmail.com
                </a>
              </li>
            </ul>
          </div>
          <div class="col-md-3">
            <h3>ADDRESS</h3>
            <ul class="list">
              <li class="list-item">
                <a
                  onClick={() =>
                    navigate("https://maps.app.goo.gl/zjZch871UNf9EGcN9")
                  }
                >
                  <FontAwesomeIcon icon={faMapMarkedAlt} /> Block 1, Blackrock
                  Business Park, Carysfort Ave, Newtown Blackrock, Blackrock,
                  Co. Dublin, Ireland
                </a>
              </li>
              {/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2384.516185191725!2d-6.181225522934198!3d53.29820127832431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x486708c19fc77925%3A0x8a638ebb0c562a25!2sBlackrock%20Business%20Park%2C%20Carysfort%20Ave%2C%20Newtown%20Blackrock%2C%20Blackrock%2C%20Co.%20Dublin%2C%20Ireland!5e0!3m2!1sen!2s!4v1704640504820!5m2!1sen!2s" width="250px" height="300px" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe> */}
            </ul>
          </div>
        </div>
        <div class="text footer-copyright">
          © 2024 Copyrights by Shahwaiz
          {/* <br></br><a onClick={() => navigate("/privacypolicy">Privacy Policy</a> */}
        </div>
      </div>
    </div>
  );
};

export default Foote;
