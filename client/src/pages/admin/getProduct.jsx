import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AdminSidebar from "../../components/adminsidebar";
const Products = () => {
  const [products, setProducts] = useState([]);

  //getall products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        "https://fashionhubserver.vercel.app/api/v1/product/get-product"
      );
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      console.log("Someething Went Wrong");
    }
  };

  //lifecycle method
  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <div className="admin-dashboard d-flex">
      <AdminSidebar />
      <div class="col-md-9" style={{ padding: "20px" }}>
        <h1 className="text-center">All Products List</h1>
        <div className="row">
          {products?.map((p) => (
            <div className="col-md-3">
              <Link
                key={p._id}
                to={`/Admindashboard/getproducts/${p.slug}`}
                className="product-link"
              >
                <div className="card m-2" style={{}}>
                  <img
                    src={`https://fashionhubserver.vercel.app/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">{p.description}</p>
                  </div>
                  <br></br>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
