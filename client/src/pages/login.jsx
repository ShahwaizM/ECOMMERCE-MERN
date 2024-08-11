import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/auth";
import "./login.css";
import Foote from "../components/footer.js";
import Navbarr from "../components/navbar.js";
import toast from "react-hot-toast";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const location = useLocation();

  // form function
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post(
      "https://fashionhubserver.vercel.app/api/v1/auth/login",
      {
        email,
        password,
      }
    );

    if (res && res.data.success) {
      toast.success(res.data.message);
      setAuth({
        ...auth,
        user: res.data.user,
        token: res.data.token,
      });
      localStorage.setItem("auth", JSON.stringify(res.data));
      
      if (auth.user.role === 1) {
        navigate("/adminDashboard"); // Redirect to admin dashboard
      } else {
        navigate(location.state || "/"); // Redirect to homepage
      }
    } else {
      setError(res.data.message);
      toast.error(res.data.message);
    }
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong");
  }
};

  return (
    <>
      <div className="container-fluid store-banner store-detail">
        <div className=" container headerpad ">
          <Navbarr />
        </div>
        <div class="container">
          <div class="row">
            <div class="fadeInleft col-md-6 login-intro">
              <h1>Welcome Back!</h1>
              <h2>
                {" "}
                Log in to access your account, manage your orders, and explore
                the latest products tailored to your preferences. Join us in
                maintaining the beauty and fashion with ease and convenience.
              </h2>
            </div>

            <div className="col-md-6 ">
              <div className=" login">
                <div className="text-center col">
                  <i class="fa fa-user"></i>
                  <hr></hr>
                </div>
                <h3 className="text-center"> LOGIN</h3>
                <form onSubmit={handleSubmit}>
                  {/* <div className="text-center mb-3">
                  <p>Sign in with:</p>
                  <button type="button" className="btn  ">
                    <i className="fa fa-facebook-f"></i>
                  </button>
                  <button type="button" className="btn  ">
                    <i className="fa fa-google"></i>
                  </button>
                  <button type="button" className="btn  ">
                    <i className="fa fa-twitter"></i>
                  </button>
                  <button type="button" className="btn  ">
                    <i className="fa fa-github"></i>
                  </button>
                </div> 
                <p className="text-center">or:</p>
                */}
                  <div class="form-group">
                    <label for="">Email</label>
                    <input
                      type="email"
                      placeholder="Email"
                      name="email"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                      required
                      className={"form-input form-control form-control-sm"}
                    />
                  </div>
                  <div class="form-group">
                    <label for="">Password</label>
                    <input
                      type="password"
                      placeholder="Password"
                      name="password"
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                      required
                      className={"form-input form-control form-control-sm"}
                    />
                  </div>
                  {error && <p style={{ color: "red" }}>{error}</p>}
                  <button className="btn btn-success" type="submit">
                    Sign In
                  </button>
                  <a
                    className="pointer sign-link"
                    onClick={() => navigate("/forgot-password")}
                  >
                    Forget Password?{" "}
                  </a>
                  <div className="text-center">
                    <p>
                      Not a member?{" "}
                      <a
                        className="pointer sign-link"
                        onClick={() => navigate("/signup")}
                      >
                        Sign up
                      </a>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Foote />
    </>
  );
}
