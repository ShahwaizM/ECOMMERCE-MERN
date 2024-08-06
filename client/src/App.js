import React from "react";
import { Navigate, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import ProductDetails from "./pages/productdetail";
import Store from "./pages/store";
import Cart from "./pages/Cart";
import CheckoutPage from "./pages/Checkout";
import Login from "./pages/login";
import Signup from "./pages/signup";
import About from "./pages/About";
import Contact from "./pages/Contact";
import AdminDashboard from "./pages/admin/adminpanel";
import AdminUsers from "./pages/admin/admin-users";
import PageNotFound from "./pages/pagenotfound";
import ForgotPasssword from "./pages/forgetpass";
// import PrivateRoute from "./Routes/Private";
import AdminRoute from "./Routes/Admin";
import CreateCategory from "./pages/admin/createCategory";
import CreateProduct from "./pages/admin/createProduct";
import Products from "./pages/admin/getProduct";
import UpdateProduct from "./pages/admin/updateProduct";
import ContactForm from "./pages/admin/contactform";
import SubscriberList from "./pages/admin/subscribers";
import Success from "./pages/success";
import AllOrders from "./pages/admin/getorders";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/product/:slug" element={<ProductDetails />} />
      <Route path="/Admindashboard" element={<AdminRoute />}>
        <Route path="" element={<AdminDashboard />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="products" element={<CreateProduct />} />
        <Route path="orders" element={<AllOrders />} />
        <Route path="getproducts" element={<Products />} />
        <Route path="getproducts/:slug" element={<UpdateProduct />} />
        <Route path="category" element={<CreateCategory />} />
        <Route path="subscriber" element={<SubscriberList />} />
        <Route path="contactforms" element={<ContactForm />} />
      </Route>
      <Route path="/store" element={<Store />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/success" element={<Success />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPasssword />} />
      <Route path="/" element={<Navigate replace to="/login" />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
