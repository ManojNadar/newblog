import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillLinkedin,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import { NavLink, useNavigate } from "react-router-dom";
import api from "./ApiConfig/index";
import { MyContext } from "./Context/BlogContext";

const Login = () => {
  const [visible, setVisible] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const route = useNavigate();
  const { state, login } = useContext(MyContext);

  // console.log(state?.currentuser);

  useEffect(() => {
    if (state?.currentuser) {
      route("/");
    }
  }, [state?.currentuser, route]);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = user;

    if (email && password) {
      try {
        const response = await api.post("/login", { user });

        if (response.data.success) {
          toast.success(response.data.message);

          const userData = response.data.userData;
          const token = response.data.token;
          login(userData, token);
          setUser({
            email: "",
            password: "",
          });
          route("/");
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    } else {
      toast.error("All fields are mandatory");
    }
  };

  const toggelEye = () => {
    setVisible(!visible);
  };
  return (
    <>
      <div className="registerBackground">
        <div className="regContainer">
          <div className="loginRegNavLink">
            <NavLink to="/login">Sign In</NavLink>
            <NavLink to="/register">Sign Up</NavLink>
          </div>

          <div className="mainOutletContainer">
            <form className="regForm" onSubmit={handleSubmit}>
              <div className="allInputs">
                <input
                  onChange={handleChange}
                  type="email"
                  value={user.email}
                  placeholder="Enter Your Email"
                  name="email"
                />
              </div>
              <div className="allInputs" id="allInputspasswordLogin">
                {user?.password && (
                  <div onClick={toggelEye}>
                    {visible ? (
                      <div className="eye">
                        <AiOutlineEyeInvisible />
                      </div>
                    ) : (
                      <div className="eye">
                        <AiOutlineEye />
                      </div>
                    )}
                  </div>
                )}
                <input
                  onChange={handleChange}
                  type={visible ? "text" : "password"}
                  placeholder="Enter Your password"
                  value={user.password}
                  name="password"
                />
              </div>
              <button className="btnSignUp" type="submit">
                Log In
              </button>

              <div className="socialSections">
                <p>Get Connected with..!!</p>

                <div className="socialIcons">
                  <div>
                    <AiFillLinkedin />
                  </div>
                  <div>
                    <AiFillFacebook />
                  </div>
                  <div>
                    <AiFillInstagram />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
