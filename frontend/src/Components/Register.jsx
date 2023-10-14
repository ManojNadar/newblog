import React, { useContext, useEffect, useState } from "react";
import "../Styles/Register_Login.css";
import { NavLink, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import api from "./ApiConfig/index";
import { toast } from "react-hot-toast";
import { MyContext } from "./Context/BlogContext";

const Register = () => {
  const [visible, setVisible] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });
  const route = useNavigate();

  const { state } = useContext(MyContext);

  useEffect(() => {
    if (state?.currentuser) {
      route("/");
    }
  }, [state?.currentuser, route]);

  // console.log(user);

  function handleChange(e) {
    const { value, name } = e.target;
    setUser({ ...user, [name]: value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password, role } = user;

    if (name && email && password && role) {
      try {
        const response = await api.post("/register", { user });
        if (response.data.success) {
          toast.success(response.data.message);
          setUser({
            name: "",
            email: "",
            password: "",
            role: "",
          });
          route("/login");
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    } else {
      toast.error("All Fields are mandatory");
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
                  type="text"
                  placeholder="Enter Your Name"
                  onChange={handleChange}
                  value={user.name}
                  name="name"
                />
              </div>
              <div className="allInputs">
                <input
                  type="email"
                  placeholder="Enter Your Email"
                  onChange={handleChange}
                  value={user.email}
                  name="email"
                />
              </div>
              <div className="allInputs" id="allInputspassword">
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
                  value={user.password}
                  type={visible ? "text" : "password"}
                  placeholder="Enter Your password"
                  name="password"
                />
              </div>
              <div className="selectOptions">
                <select onChange={handleChange} name="role" value={user.role}>
                  <option>Select Role</option>
                  <option value="Admin">Admin</option>
                  <option value="User">User</option>
                </select>
              </div>
              <button className="btnSignUp" type="submit">
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
