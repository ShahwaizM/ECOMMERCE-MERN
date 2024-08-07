import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import React from "react";
import "./home.css";
import product1 from "../assets/product1.jpg";
import BodyStructure from "../components/body";
import { Container, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLock,
  faMoneyCheck,
  faTruck,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";

import Navbarr from "../components/navbar.js";
const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <BodyStructure>
        <div className="container-fluid banner">
          <div className="headerpad container ">
            <Navbarr />

            <div className="col banner-title fadeInleft">
              <h1> Luxury Cloths Luxury Lifestyle!</h1>
              <h4>
                dummy title paragraph explainning brand dummy title paragraph
                explainning branddummy title paragraph explainning brand
              </h4>
              <br></br>
              <button
                onClick={() => navigate("/store")}
                className="btn btn-shop "
              >
                {" "}
                Shopping Now!
              </button>
            </div>
          </div>
        </div>
        <Container fluid className="products-section">
          <Container>
            <br></br>
            <div className="text-center home-category">
              <h1>Shop By Categories</h1>
              <Row className=" products">
                <div className="col-sm-6 col-md-4 col-lg-4">
                  <a href="\store">
                    <img
                      className="img-fluid rounded-3"
                      alt="product"
                      src={product1}
                    ></img>
                  </a>
                  <h2>Jackets</h2>
                </div>
                <div className="col-sm-6 col-md-4 col-lg-4">
                  <a href="\store">
                    <img
                      className="img-fluid rounded-3"
                      alt="product"
                      src="https://media.istockphoto.com/id/479382464/vector/blue-sport-shoes-for-running.jpg?s=612x612&w=0&k=20&c=v_fkHkodSuuZnH3dswhtKJz8aZmNgwxjfYOQ0ocvOdA="
                    ></img>
                  </a>
                  <h2>Shoes</h2>
                </div>
                <div className="col-sm-6 col-md-4 col-lg-4">
                  <a href="\store">
                    <img
                      className="img-fluid rounded-3"
                      alt="product"
                      src="https://i.pinimg.com/736x/19/c9/8e/19c98e018217ed7be82177b02e12994e.jpg"
                    ></img>
                  </a>
                  <h2>Jeans</h2>
                </div>
                <div className="col-sm-6 col-md-4 col-lg-4">
                  <a href="\store">
                    <img
                      className="img-fluid rounded-3"
                      alt="product"
                      src="https://img.freepik.com/premium-photo/front-view-black-hoodie-isolated-white-background_236836-22582.jpg"
                    ></img>
                  </a>
                  <h2>Hoodies</h2>
                </div>
                <div className="col-sm-6 col-md-4 col-lg-4">
                  <a href="\store">
                    <img
                      className="img-fluid rounded-3"
                      alt="product"
                      src="https://img.freepik.com/premium-photo/warm-knitted-sweater-white-background_900706-5249.jpg"
                    ></img>
                  </a>
                  <h2>Sweaters</h2>
                </div>
                <div className="col-sm-6 col-md-4 col-lg-4">
                  <a href="\store">
                    <img
                      className="img-fluid rounded-3"
                      alt="product"
                      src="https://t4.ftcdn.net/jpg/03/02/10/41/360_F_302104122_icLufAvgt2ZsR3QP5PG4DhRfwEvWHFWq.jpg"
                    ></img>
                  </a>
                  <h2>Watches</h2>
                </div>
                <div className="col-sm-6 col-md-4 col-lg-4">
                  <a href="\store">
                    <img
                      className="img-fluid rounded-3"
                      alt="product"
                      src="https://media.istockphoto.com/id/1347568249/photo/blank-blue-blazer-mockup-mens-grey-suit-front-view.jpg?s=612x612&w=0&k=20&c=CYPM-WaabwIFvGxfb7KhR_JcvY5D3ujBj0i1YUznDP0="
                    ></img>
                  </a>
                  <h2>Coats</h2>
                </div>
                <div className="col-sm-6 col-md-4 col-lg-4">
                  <a href="\store">
                    <img
                      className="img-fluid rounded-3"
                      alt="product"
                      src="https://i.pinimg.com/736x/be/3f/af/be3faf8625db1a1675e23ff8cdc9d1cd.jpg"
                    ></img>
                  </a>
                  <h2>Bags</h2>
                </div>
                <div className="col-sm-6 col-md-4 col-lg-4">
                  <a href="\store">
                    <img
                      className="img-fluid rounded-3"
                      alt="product"
                      src="https://i.pinimg.com/736x/b3/80/b0/b380b049090595b0547cba5acd27d463.jpg"
                    ></img>
                  </a>
                  <h2>Sunglasses</h2>
                </div>
              </Row>
            </div>
          </Container>
        </Container>
        <Container fluid className="banner2">
          <Container>
            <div className="banner2-title fadeInleft">
              <h2 className="red">LIMITED EDITION</h2>
              <h1>Hurry Up! Flat 30% OFF</h1>
              <h2>Select the best you want, What are you Waiting For?</h2>
              <br></br>
              <button
                onClick={() => navigate("/store")}
                className="btn btn-shop "
              >
                {" "}
                Shop Now!
              </button>
            </div>
          </Container>
        </Container>
        <Container className="whyus ">
          <div className="row">
            {/* <h1 className='Text-center'>WHY US?</h1> */}

            <div className=" col-sm-6 col-lg-3">
              <div className="whyus-block">
                <FontAwesomeIcon icon={faTruck} size="4x"></FontAwesomeIcon>
                <h4>Free Shipping</h4>
                <h6>Order above PKR 3000</h6>
              </div>
            </div>
            <div className=" col-sm-6 col-lg-3">
              <div className="whyus-block">
                <FontAwesomeIcon
                  icon={faMoneyCheck}
                  size="4x"
                ></FontAwesomeIcon>
                <h4>Money-Back</h4>
                <h6>15 Days gurrantee</h6>
              </div>
            </div>
            <div className=" col-sm-6 col-lg-3">
              <div className="whyus-block">
                <FontAwesomeIcon size="4x" icon={faLock}></FontAwesomeIcon>
                <h4>Secure Payments</h4>
                <h6>Secured by Stripe, Paypal</h6>
              </div>
            </div>
            <div className=" col-sm-6 col-lg-3">
              <div className="whyus-block">
                <FontAwesomeIcon size="4x" icon={faPhone}></FontAwesomeIcon>
                <h4>24/7 Support</h4>
                <h6>Phone And Email support</h6>
              </div>
            </div>
          </div>
        </Container>
      </BodyStructure>
    </>
  );
};

export default Home;
