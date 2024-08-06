import React from "react";
import { Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";

function AdminSidebar() {
  const navigate = useNavigate();
  const [auth] = useAuth();
  return (
    <div className="admin-sidebar col-md-2">
      <h2>Admin Panel</h2>
      <h6> Admin Name : {auth?.user?.name}</h6>
      <h6> Admin Email : {auth?.user?.email}</h6>
      <h6> Admin Contact : {auth?.user?.phone}</h6>
      <Nav defaultActiveKey="/dashboard" className="flex-column">
        <Nav.Link onClick={() => navigate("/")}>FashionHub</Nav.Link>
        <Nav.Link onClick={() => navigate("/Admindashboard")}>
          Dashboard
        </Nav.Link>
        <Nav.Link onClick={() => navigate("/Admindashboard/users")}>
          users
        </Nav.Link>
        <Nav.Link onClick={() => navigate("/Admindashboard/orders")}>
          Orders
        </Nav.Link>
        <Nav.Link onClick={() => navigate("/Admindashboard/products")}>
          Craete Products
        </Nav.Link>{" "}
        <Nav.Link onClick={() => navigate("/Admindashboard/getproducts")}>
          Products
        </Nav.Link>
        <Nav.Link onClick={() => navigate("/Admindashboard/category")}>
          Category
        </Nav.Link>
        <Nav.Link onClick={() => navigate("/Admindashboard/subscriber")}>
          Subscriber
        </Nav.Link>
        <Nav.Link onClick={() => navigate("/Admindashboard/contactforms")}>
          Contact Forms
        </Nav.Link>
      </Nav>
    </div>
  );
}

export default AdminSidebar;
