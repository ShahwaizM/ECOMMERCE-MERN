import React, { useState } from "react";
import "./home.css";
import "./Contact.css";
import axios from "axios";
import BodyStructure from "../components/body";
import Navbarr from "../components/navbar.js";
import toast from "react-hot-toast";
const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });

  const [formStatus, setFormStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://fashionhubserver.vercel.app/api/v1/contact/postcontact",
        formData
      );
      setFormStatus("Form submitted successfully!");
      toast.success("Form submitted successfully!");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      setFormStatus("There was an error submitting the form.");
      console.error(error);
    }
  };

  return (
    <>
      <BodyStructure title={["Contact US"]}>
        <div className="container-fluid about-banner about-detail">
          <div className=" container headerpad ">
            <Navbarr />
          </div>
          <div className="about-title text-center">
            <h1> Contact Us</h1>
            <br></br>
          </div>{" "}
        </div>{" "}
        <div className="container-fluid shop">
          <div className="container shop-b">
            <br />
            <br />
            <div className="row contact1">
              <div
                className="fadeInleft col-md-6"
                style={{ color: "white", padding: "10px" }}
              >
                <h1>Get in Touch</h1>
                <br />
                <h4>
                  We'd love to hear from you! Whether you have a question about
                  a product or need assistance with your order, our friendly
                  team is here to help. Contact us today to discover how{" "}
                  <span className="orange">Fashion Hub</span> can enhance your
                  style and wardrobe needs.
                </h4>
                <br />
                <h3>CONTACT INFORMATION</h3>
                <p>
                  <a
                    style={{ color: "white" }}
                    href="mailto:fashionhub@example.com"
                  >
                    <i className="orange fa fa-envelope">&nbsp;</i>{" "}
                    fashionhub@example.com
                  </a>
                </p>
                <p>
                  <a style={{ color: "white" }} href="tel:+3125800367">
                    <i className="orange fa fa-phone">&nbsp;</i> +99999999999{" "}
                  </a>
                </p>
                <br />
                <h3>Fashion Hub</h3>
                <p>
                  <a
                    style={{ color: "white" }}
                    href="https://maps.app.goo.gl/tTkwcCrmM5U138uM9"
                  >
                    <i className="fa orange fa-map-marker">&nbsp;</i>  Block 1, Blackrock
                  Business Park, Carysfort Ave, Newtown Blackrock, Blackrock,
                  Co. Dublin, Ireland
                  </a>
                </p>
                <p style={{ fontWeight: "lighter" }}>
                  <strong>Monday - Friday:</strong> 7:00am - 3:00pm <br />
                  <strong>Saturday & Sunday:</strong> 8:00am - 3:00pm
                </p>
                <br />
                <ul
                  className="list-inline social-icons"
                  style={{ color: "white" }}
                >
                  <li className="list-inline-item">
                    <a href="https://www.facebook.com/profile.php?id=61555397613317">
                      <i className="fa fa-brands fa-facebook"></i>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="https://www.twitter.com">
                      <i className="fa fa-twitter fa-brands"></i>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="https://www.instagram.com">
                      <i className="fa fa-instagram fa-brands"></i>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="https://www.youtube.com">
                      <i className="fa fa-brands fa-youtube"></i>
                    </a>
                  </li>
                </ul>
              </div>
              <div className="fadeInleft col-md-6" style={{ padding: "20px" }}>
                <div className="q-form">
                  <h2>General Questions</h2>
                  <br />
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label htmlFor="firstName">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        className="form-control"
                        id="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="lastName">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        className="form-control"
                        id="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        style={{ backgroundColor: "white", color: "black" }}
                        type="email"
                        name="email"
                        className="form-control"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="subject">Message Subject</label>
                      <input
                        type="text"
                        name="subject"
                        className="form-control"
                        id="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="message">Message</label>
                      <textarea
                        className="form-control"
                        name="message"
                        id="message"
                        rows="5"
                        value={formData.message}
                        onChange={handleChange}
                        required
                      ></textarea>
                    </div>
                    <button type="submit" className="product-btn">
                      SEND MESSAGE
                    </button>
                  </form>
                  {formStatus && <p>{formStatus}</p>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </BodyStructure>{" "}
    </>
  );
};

export default Contact;
