import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import React, { useState } from "react";
import "../App.css";
import "./login.css";
import Foote from "../components/footer.js";
import Navbarr from "../components/navbar.js";
// export default function Signup() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [phone, setPhone] = useState("");
//   const [address, setAddress] = useState("");

//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const url = "https://fashionhubserver.vercel.app/api/v1/auth/register";
//       const res = await axios.post(
//         "https://fashionhubserver.vercel.app/api/v1/auth/register",
//         {
//           name,
//           email,
//           password,
//           phone,
//           address,
//         }
//       );
//       console.log(res.message);

//       if (res && res.success) {
//         console.log(res.data && res.message);
//         navigate("/login");
//       } else {
//         console.log(res.message);
//       }
//     } catch (error) {
//       if (
//         error.response &&
//         error.response.status >= 400 &&
//         error.response.status <= 500
//       ) {
//         setError(error.response.message);
//       }
//       console.log(error);
//       console.log("Something went wrong");
//     }
//   };
//   return (
//     <>
// <div className="container-fluid store-banner store-detail">
//   <div className=" container headerpad ">
//     <Navbarr />
//   </div>
//   <div class="container">
//     <div class="row">
//       <div class="fadeInleft col-md-6 login-intro">
//         <h1>ELEVATE YOUR FASHION EXPERIENCE WITH US!!</h1>
//         <h2>
//           {" "}
//           Sign Up to access your account, manage your orders, and explore
//           the latest products tailored to your preferences. Sign up now to
//           access exclusive deals, personalized recommendations, and more!
//         </h2>
//       </div>

//       <div className="col-md-6 ">
//         <div className=" login">
//           <div className="text-center col">
//             <i class="fa fa-user"></i>
//             <hr></hr>
//           </div>
//           <h3 className="text-center"> SIGN UP</h3>
//           <form onSubmit={handleSubmit}>
//             {/* <div className="text-center mb-3">
//           <p>Sign up with:</p>
//           <button type="button" className="btn  ">
//             <i className="fa fa-facebook-f"></i>
//           </button>
//           <button type="button" className="btn  ">
//             <i className="fa fa-google"></i>
//           </button>
//           <button type="button" className="btn  ">
//             <i className="fa fa-twitter"></i>
//           </button>
//           <button type="button" className="btn  ">
//             <i className="fa fa-github"></i>
//           </button>
//         </div>
//         <p className="text-center">or:</p>
//         */}
//             <div class="form-group">
//               <label for=""> Name</label>
//               <input
//                 type="text"
//                 placeholder="Name"
//                 name="name"
//                 onChange={(e) => setName(e.target.value)}
//                 value={name}
//                 required
//                 className={"form-input form-control form-control-sm"}
//               />
//             </div>

//             <div class="form-group">
//               <label for="">Email</label>
//               <input
//                 type="email"
//                 placeholder="Email"
//                 name="email"
//                 onChange={(e) => setEmail(e.target.value)}
//                 value={email}
//                 required
//                 className={"form-input form-control form-control-sm"}
//               />
//             </div>
//             <div class="form-group">
//               <label for="">Phone</label>
//               <input
//                 type="text"
//                 placeholder="Phone"
//                 name="phone"
//                 onChange={(e) => setPhone(e.target.value)}
//                 value={phone}
//                 required
//                 className={"form-input form-control form-control-sm"}
//               />
//             </div>
//             <div class="form-group">
//               <label for="">Address</label>
//               <input
//                 type="address"
//                 placeholder="address"
//                 name="address"
//                 onChange={(e) => setAddress(e.target.value)}
//                 value={address}
//                 required
//                 className={"form-input form-control form-control-sm"}
//               />
//             </div>
//             <div class="form-group">
//               <label for="">Password</label>
//               <input
//                 type="password"
//                 placeholder="Password"
//                 name="password"
//                 onChange={(e) => setPassword(e.target.value)}
//                 value={password}
//                 required
//                 className={"form-input form-control form-control-sm"}
//               />
//             </div>
//             {error && <div>{error}</div>}
//             <button className="btn btn-success" type="submit">
//               Sign UP
//             </button>
//             <div className="text-center">
//               <p>
//                 Already have account {"  "}
//                 <a
//                   className="pointer sign-link"
//                   onClick={() => navigate("/signup")}
//                 >
//                   Log In
//                 </a>
//               </p>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   </div>
// </div>
// <Foote />
//     </>
//   );
// }
const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [answer, setAnswer] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");
  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://fashionhubserver.vercel.app/api/v1/auth/register",
        {
          name,
          answer,
          email,
          password,
          phone,
          address,
        }
      );
      console.log(res.data);
      if (res && res.data.success) {
        console.log(res.data && res.data.message);
        navigate("/login");
      } else {
        console.log(res.data.message);
        setError(res.data.message);
      }
    } catch (error) {
      console.log(error);
      console.log("Something went wrong");
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
              <h1>ELEVATE YOUR FASHION EXPERIENCE WITH US!!</h1>
              <h2>
                {" "}
                Sign Up to access your account, manage your orders, and explore
                the latest products tailored to your preferences. Sign up now to
                access exclusive deals, personalized recommendations, and more!
              </h2>
            </div>

            <div className="col-md-6 ">
              <div className=" login">
                <div className="text-center col">
                  <i class="fa fa-user"></i>
                  <hr></hr>
                </div>
                <h3 className="text-center"> SIGN UP</h3>
                <form onSubmit={handleSubmit}>
                  {/* <div className="text-center mb-3">
                <p>Sign up with:</p>
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
                    <label for=""> Name</label>
                    <input
                      type="text"
                      placeholder="Name"
                      name="name"
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                      required
                      className={"form-input form-control form-control-sm"}
                    />
                  </div>

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
                    <label for="">Phone</label>
                    <input
                      type="text"
                      placeholder="Phone"
                      name="phone"
                      onChange={(e) => setPhone(e.target.value)}
                      value={phone}
                      required
                      className={"form-input form-control form-control-sm"}
                    />
                  </div>
                  <div class="form-group">
                    <label for="">Secret Answer</label>
                    <input
                      type="text"
                      placeholder="What is your favourite sports?"
                      name="answer"
                      onChange={(e) => setAnswer(e.target.value)}
                      value={answer}
                      required
                      className={"form-input form-control form-control-sm"}
                    />
                  </div>
                  <div class="form-group">
                    <label for="">Address</label>
                    <input
                      type="address"
                      placeholder="address"
                      name="address"
                      onChange={(e) => setAddress(e.target.value)}
                      value={address}
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
                  {error && <div>{error}</div>}
                  <button className="btn btn-success" type="submit">
                    Sign UP
                  </button>
                  <div className="text-center">
                    <p>
                      Already have account {"  "}
                      <a
                        className="pointer sign-link"
                        onClick={() => navigate("/login")}
                      >
                        Log In
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
};

export default Signup;
