import React from "react";
// import { isLoggedIn } from "../context/auth";
import { Navbar, Nav, Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";

export default function Navbarr() {
  const {
    cart,
    setCart,
    incrementItemQuantity,
    decrementItemQuantity,
    removeItemFromCart,
  } = useCart();
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    console.log("Logout Successfully");
  };
  return (
    <Navbar bg="transparent" expand="lg" className="animated fadeInDown">
      <Container fluid>
        <Navbar.Brand className="br pointer" onClick={() => navigate("/")}>
          FashionHub
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-collapse" />
        <Navbar.Collapse id="navbar-collapse">
          <>
            <Nav className="ms-auto text-center">
              <Nav.Link onClick={() => navigate("/store")}>Store</Nav.Link>
              <Nav.Link onClick={() => navigate("/about")}>About</Nav.Link>
              <Nav.Link onClick={() => navigate("/contact")}>Contact</Nav.Link>
            </Nav>
            <Nav className="ms-auto">
              <Nav.Link onClick={() => navigate("/cart")}>
                Cart
                <i className="fa fa-shopping-cart fa-1x">
                  <span className="cart-badge">{cart.length}</span>
                </i>
              </Nav.Link>
              {auth?.user?.role == 1 ? (
                <>
                  <Nav.Link onClick={() => navigate("/Admindashboard")}>
                    Dashboard
                  </Nav.Link>
                </>
              ) : (
                auth?.user?.role == 0 && (
                  <Nav.Link onClick={() => navigate("#")}>Orders</Nav.Link>
                )
              )}
              {!auth?.user ? (
                <>
                  <Nav.Link onClick={() => navigate("/login")}>Login</Nav.Link>
                  <Nav.Link onClick={() => navigate("/signup")}>
                    Signup
                  </Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link onClick={handleLogout}>Log Out</Nav.Link>
                </>
              )}
            </Nav>
          </>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
