import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import React from "react";
import "./home.css";
import "./About.css";
import Foote from "../components/footer.js";
import Navbarr from "../components/navbar.js";
import p from "../assets/banner.jpg";
const About = () => {
  const onButtonClick = () => {
    // Button click logic here
  };

  return (
    <>
      <div className="container-fluid about-banner store-detail">
        <div className=" container headerpad ">
          <Navbarr />
        </div>
        <div className="store-title text-center">
          <h1> About Us</h1>
        </div>{" "}
      </div>{" "}
      <div class="container-fluid info">
        <div class="container fadeInleft info-content">
          <div class="info-desc">
            <br />
            <h2>
              Welcome to Fashion Hub, your premier destination for top-quality
              fashion products. We specialize in providing style enthusiasts and
              everyday shoppers with a curated selection of items designed to
              enhance your wardrobe. From trendy jeans and stylish jackets to
              chic glasses and versatile bags, we are dedicated to offering the
              best solutions to elevate your fashion game. Discover the
              difference at Fashion Hub and upgrade your style experience today.
            </h2>
            <div class="info-title">
              <br />
              <br />
              <h1 class="text-center">WHY CHOOSE US?</h1>
            </div>
            <div class="info-desc">
              <h2 class="">
                Discover a wide range of high-quality fashion products that
                cater to all your style needs. From trendy jeans and stylish
                jackets to chic glasses and versatile bags, we have everything
                you need to elevate your wardrobe.
              </h2>
              <hr />
              <h2>
                <span class="orange">Quality Assurance:</span> We meticulously
                select each item in our collection to ensure it meets our high
                standards for quality and durability.
                <br />
                <hr />
                <span class="orange">Wide Selection:</span> Whether you're
                looking for the latest trends in jeans, fashionable bags,
                stylish glasses, or comfortable shoes, our diverse range of
                products caters to every taste and need.
                <br />
                <hr />
                <span class="orange">Expertise:</span> Our team consists of
                fashion enthusiasts who are knowledgeable about our products and
                passionate about helping customers find the perfect pieces to
                complement their style.
                <br />
                <hr />
                <span class="orange">Customer Satisfaction:</span> At Fashion
                Hub, customer satisfaction is our top priority. We strive to
                provide exceptional service, fast shipping, and reliable support
                to ensure every customer has a positive shopping experience with
                us.
              </h2>
            </div>
          </div>
        </div>
        <br />
      </div>
      <Foote />
    </>
  );
};
export default About;
