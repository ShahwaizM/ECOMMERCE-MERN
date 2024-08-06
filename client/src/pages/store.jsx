import { useLocation } from "react-router-dom";
import "./home.css";
import "./productdetails.css";
import "./store.css";
import Foote from "../components/footer.js";
import Navbarr from "../components/navbar.js";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Spin, Pagination } from "antd";
import { Prices } from "../components/Prices";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
const Store = () => {
  const {
    cart,
    setCart,
    incrementItemQuantity,
    decrementItemQuantity,
    removeItemFromCart,
  } = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(8); // Define page size
  const [keyword, setKeyword] = useState("");

  //get all cat
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/category/get-category"
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);
  //get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts(data.products);
      setKeyword("");
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  //getTOtal COunt
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/product/product-count"
      );
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, [page]);

  //load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const handlePageChange = (page, pageSize) => {
    setPage(page);
    setPageSize(pageSize);
    if (checked.length || radio.length) {
      filterProduct(); // Call filterProduct to get filtered products with pagination
    } else {
      getAllProducts();
    }
  };

  // filter by keword
  const handleSearch = async () => {
    if (keyword.trim()) {
      try {
        const { data } = await axios.get(
          `http://localhost:8080/api/v1/product/search/${keyword}`
        );
        setProducts(data);
        setTotal(data.length); // Update total to reflect the number of search results
      } catch (error) {
        console.log(error);
      }
    } else {
      getAllProducts(); // Reset to all products if search is cleared
    }
  };

  // filter by cat
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };
  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  //get filterd product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        `http://localhost:8080/api/v1/product/product-filters/${page}`,
        {
          checked,
          radio,
          pageSize, // Include page size
        }
      );
      setProducts(data?.products);
      setTotal(data?.total); // Update total to reflect the filtered results
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="container-fluid store-banner store-detail">
        <div className=" container headerpad ">
          <Navbarr />
        </div>
        <div className="store-title text-center">
          <h1> Shop Page</h1>
          <br></br>
          <h4>
            dummy title paragraph explainning brand dummy title paragraph
            explainning
          </h4>
          <br></br>
        </div>{" "}
      </div>
      <div class="container-fluid store">
        <div class="container ">
          <div className="store-filter row ">
            <div className="dropdown search-bar ">
              <input
                className="search_input"
                type="text"
                placeholder="Search products..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyUp={handleSearch}
              />
              <span className="search-icon" onClick={handleSearch}>
                <i className="fa fa-search"></i>
              </span>
            </div>
            <div className="dropdown ">
              <a
                className="btn d-flex justify-content-between align-items-center btn-secondary dropdown-toggle"
                role="button"
                id="dropdownMenuLink1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <span>Categories</span>
              </a>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink1">
                {categories?.map((c) => (
                  <li key={c._id}>
                    <div className="dropdown-item">
                      <input
                        type="checkbox"
                        onChange={(e) => handleFilter(e.target.checked, c._id)}
                      />{" "}
                      {c.name}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="dropdown ">
              <a
                className="btn btn-secondary d-flex justify-content-between align-items-center dropdown-toggle"
                role="button"
                id="dropdownMenuLink2"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <span> All Prices</span>
              </a>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink2">
                {Prices?.map((p) => (
                  <li key={p._id}>
                    <div className="dropdown-item">
                      <input
                        type="radio"
                        name="price"
                        onChange={(e) => setRadio(p.array)}
                      />{" "}
                      {p.name}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="dropdown ">
              <button
                className=" reset-btn btn btn-danger "
                onClick={() => window.location.reload()}
              >
                RESET FILTERS
              </button>
            </div>{" "}
          </div>
          <br></br>
          {loading ? (
            <Spin />
          ) : (
            <div class="row text-center ">
              {products?.map((p) => (
                <div class=" m2 col-sm-6 col-md-4 col-lg-3 ">
                  <div class="product-card card">
                    <div className="product-img">
                      <Link
                        key={p._id}
                        to={`/product/${p.slug}`}
                        className="product-link"
                      >
                        <img
                          class="img-responsive card-img-top"
                          src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
                          alt="Card  cap"
                        ></img>
                      </Link>
                    </div>
                    <div class="card-body">
                      <h2 class="card-title">{p.name}</h2>
                      {/* {!p.description ? (
                        <br></br>
                      ) : (
                        <h4 className="card-text">
                          {p.description.substring(0, 30)}
                        </h4>
                      )} */}

                      <h4 class="card-text">
                        <b>{p.price}</b>
                      </h4>
                      <button
                        onClick={() => {
                          const existingItemIndex = cart.findIndex(
                            (item) => item._id === p._id
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
                            updatedCart = [...cart, { ...p, quantity: 1 }];
                          }

                          setCart(updatedCart);
                          localStorage.setItem(
                            "cart",
                            JSON.stringify(updatedCart)
                          );
                          toast.success("Item Added to cart");
                        }}
                        className="cart-btn-pad cart-btn"
                      >
                        Add to Cart
                      </button>

                      {/* <!-- True --> */}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="m-2 p-3">
            {products && products.length > 0 && (
              <Pagination
                current={page}
                pageSize={pageSize}
                total={total}
                onChange={handlePageChange} // Use handlePageChange function
              />
            )}
          </div>
        </div>
        <br></br>
        <br></br>
      </div>

      <Foote />
    </>
  );
};
export default Store;
