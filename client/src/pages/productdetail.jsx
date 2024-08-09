import { useLocation } from "react-router-dom";
import "./home.css";
import "./productdetails.css";

import Foote from "../components/footer.js";
import Navbarr from "../components/navbar.js";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
const ProductDetails = () => {
  const params = useParams();
  const {
    cart,
    setCart,
    incrementItemQuantity,
    decrementItemQuantity,
    removeItemFromCart,
  } = useCart();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  //getProduct
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `https://fashionhubserver.vercel.app/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };
  //get similar product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `https://fashionhubserver.vercel.app/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="container-fluid product-detail">
        <div className=" container ">
          <Navbarr />
        </div>
      </div>
      <div className="container-fluid store">
        <div class="container ">
          <ul class="list-inline  product-tiles">
            <li class="list-inline-item">
              <a href="/store">STORE</a>
            </li>
            <span className="sp">{"> "}</span>
            <li class="list-inline-item black">
              <a> {product?.category?.name}</a>
            </li>
          </ul>
          <br></br>
          <div class="row ">
            <div class="col-md-6 col-lg-6 ">
              <div className="product-card card">
                <img
                  src={`https://fashionhubserver.vercel.app/api/v1/product/product-photo/${product._id}`}
                  alt={product.name}
                  className="img-responsive card-img-top"
                ></img>
              </div>
            </div>
            <div class="col-md-6 col-lg-6 ">
              <h1>Product Description</h1>
              <h2>Name: {product.name}</h2>
              <h3>Category: {product?.category?.name}</h3>
              <h4>
                Price:
                $ {product.price}
              </h4>
              <br></br>
              <h3 class="black">Description: {product.description}</h3>
              <br></br>
              <div className="">
                <button
                  onClick={() => {
                    const existingItemIndex = cart.findIndex(
                      (item) => item._id === product._id
                    );

                    let updatedCart;
                    if (existingItemIndex >= 0) {
                      // If the item exists, update the quantity
                      updatedCart = cart.map((item, index) =>
                        index === existingItemIndex
                          ? { ...item, quantity: item.quantity + 1 }
                          : item
                      );
                    } else {
                      // If the item doesn't exist, add it with quantity 1
                      updatedCart = [...cart, { ...product, quantity: 1 }];
                    }

                    setCart(updatedCart);
                    localStorage.setItem("cart", JSON.stringify(updatedCart));
                    toast.success("Item Added to cart");
                  }}
                  className="cart-btn-pad cart-btn"
                >
                  Add to Cart
                </button>
              </div>
              {/* <div class="row cartbtn" >
                        <form action="/product/107/" class="col " method="post">
                            <input type="hidden" name="csrfmiddlewaretoken" value="OaFy732HLioTh04LolDywn1VhDrBAvvPYs0F7zDtvuIPz0RSoXvCJIlPv79daSQ4"></input>
                            <input hidden type="text" name="product" value="107"></input>
                            <input hidden type="text" name="remove" value="True"></input>
                            <input type="submit" value=" - " class="btn-success btn"></input>
                        </form>
                        <div  class="text-center btn btn-success">1 in Cart</div>
                        <form action="/product/107/" class="" method="post">
                            <input type="hidden" name="csrfmiddlewaretoken" value="OaFy732HLioTh04LolDywn1VhDrBAvvPYs0F7zDtvuIPz0RSoXvCJIlPv79daSQ4"></input>
                            <input hidden type="text" name="product" value="107"></input>
                            <input type="submit" value=" + " class="btn-success btn"></input>
                        </form>
                    </div> */}
            </div>
          </div>
          <div class="container-fluid">
            <br></br>
            <h2>YOU MIGHT ALSO LIKE</h2>
            <br></br>
          </div>
          {relatedProducts.length < 1 && (
            <p className="text-center">No Similar Products found</p>
          )}
          <div class="row">
            {relatedProducts?.map((p) => (
              <div class="m2 text-center col-md-4" id="107">
                <div class="product-card card">
                  <div className="product-img">
                    <a onClick={() => navigate(`/product/${p.slug}`)}>
                      <img
                        class="img-responsive card-img-top"
                        src={`https://fashionhubserver.vercel.app/api/v1/product/product-photo/${p?._id}`}
                        alt={p.name}
                      ></img>
                    </a>
                  </div>
                  <div class="card-body">
                    <h2 class="card-title">{p.name}</h2>
                    <h4 class="card-text">
                      <b>
                        {p.price.toLocaleString("en-US", {
                          style: "currency",
                          currency: "usd",
                        })}
                      </b>
                    </h4>
                    <div className="">
                      <button
                        onClick={() => {
                          const existingItemIndex = cart.findIndex(
                            (item) => item._id === product._id
                          );

                          let updatedCart;
                          if (existingItemIndex >= 0) {
                            // If the item exists, update the quantity
                            updatedCart = cart.map((item, index) =>
                              index === existingItemIndex
                                ? { ...item, quantity: item.quantity + 1 }
                                : item
                            );
                          } else {
                            // If the item doesn't exist, add it with quantity 1
                            updatedCart = [
                              ...cart,
                              { ...product, quantity: 1 },
                            ];
                          }

                          setCart(updatedCart);
                          localStorage.setItem(
                            "cart",
                            JSON.stringify(updatedCart)
                          );
                          toast.success("Item Added to cart");
                        }}
                        className=" cart-btn"
                      >
                        {" "}
                        Add to cart
                      </button>
                    </div>
                    {/* <!-- True --> */}
                  </div>
                  {/* <div class="card-footer p-0">
                            
                             <div class="row cartbtn" >
                                <form action="/product/107/" class="col " method="post">
                                    <input type="hidden" name="csrfmiddlewaretoken" value="OaFy732HLioTh04LolDywn1VhDrBAvvPYs0F7zDtvuIPz0RSoXvCJIlPv79daSQ4"></input>
                                    <input hidden type="text" name="product" value="107"></input>
                                    <input hidden type="text" name="remove" value="True"></input>
                                    <input type="submit" value=" - " class="btn-success btn"></input>
                                </form>
                                <div class="text-center  btn btn-success">1 in Cart</div>
                                <form action="/product/107/" class=" " method="post">
                                    <input type="hidden" name="csrfmiddlewaretoken" value="OaFy732HLioTh04LolDywn1VhDrBAvvPYs0F7zDtvuIPz0RSoXvCJIlPv79daSQ4"></input>
                                    <input hidden type="text" name='product' value='107'></input>
                                    <input type="submit" value=" + " class="btn-success btn"></input>
                                </form>
                </div> 
                        </div>*/}
                </div>
              </div>
            ))}
          </div>
        </div>
        <br></br>
        <br></br>
      </div>
      <Foote />
    </>
  );
};
export default ProductDetails;
