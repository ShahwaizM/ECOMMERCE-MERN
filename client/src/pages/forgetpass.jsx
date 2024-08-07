import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbarr from "../components/navbar";
import Foote from "../components/footer";
const ForgotPasssword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://fashionhubserver.vercel.app/api/v1/auth/forgot-password",
        {
          email,
          newPassword,
          answer,
        }
      );
      if (res && res.data.success) {
        console.log(res.data && res.data.message);

        navigate("/login");
      } else {
        console.log(res.data.message);
        error = setError(res.data.message);
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
            <div className="col-md-6 forgot-pass">
              <div className=" login">
                <div className="text-center col">
                  <i class="fa fa-user"></i>
                  <hr></hr>
                </div>
                <h3 className="text-center"> Reset Password</h3>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={"form-input form-control form-control-sm"}
                      id="exampleInputEmail1"
                      placeholder="Enter Your Email "
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                      className={"form-input form-control form-control-sm"}
                      id=""
                      placeholder="Enter Your favorite Sport Name "
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className={"form-input form-control form-control-sm"}
                      id=""
                      placeholder="Enter Your Password"
                      required
                    />
                  </div>
                  {error && <div>{error}</div>}

                  <button type="submit" className="btn btn-success">
                    RESET
                  </button>
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
export default ForgotPasssword;
