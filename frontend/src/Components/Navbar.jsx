import React, { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
import { BsFillXSquareFill } from "react-icons/bs";
import { MyContext } from "./Context/BlogContext";
import "../Styles/Navbar.css";

const Navbar = () => {
  const [dropDown, setDropDown] = useState(false);
  const { state, logout } = useContext(MyContext);
  const route = useNavigate();

  const extractDropDown = () => {
    setDropDown(!dropDown);
  };

  return (
    <>
      {dropDown ? (
        <div className="dropSideNav">
          {/* dropdown starts */}

          <div className="innerDropDownContainer">
            <h2 onClick={() => route("/")}>
              {state?.currentuser?.name.toUpperCase()}
            </h2>
            <h2 onClick={() => route("/")}>Home</h2>
            <h2 onClick={() => route("/allblogs")}>ALL TRAVEL BLOGS</h2>

            {state?.currentuser?.role == "Admin" ? (
              <NavLink to="/addblog" className="innerDropDownContainer">
                <h2>CREATE BLOG</h2>
              </NavLink>
            ) : null}
            {state?.currentuser?.role == "User" ? (
              <div className="innerDropDownContainer">
                <h2>SAVED BLOGS</h2>
                <h2>LIKED BLOGS</h2>
                <h2>ABOUT US</h2>
                <h2>CONTACT US</h2>
                <h2>FEEDBACK</h2>
              </div>
            ) : null}
          </div>

          {state?.currentuser ? (
            <div className="logout" onClick={logout}>
              <h1>LOGOUT</h1>
            </div>
          ) : (
            <div className="logout" onClick={() => route("/login")}>
              <h1>LOGIN</h1>
            </div>
          )}

          {/* dropDown end */}
        </div>
      ) : null}

      <div className="leftNav">
        {dropDown ? (
          <h1 onClick={extractDropDown}>
            <BsFillXSquareFill />
          </h1>
        ) : (
          <h1 onClick={extractDropDown}>
            <AiOutlineMenu />
          </h1>
        )}
      </div>
    </>
  );
};

export default Navbar;
