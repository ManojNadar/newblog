import React, { createContext, useEffect, useReducer } from "react";
import api from "../ApiConfig/index";

export const MyContext = createContext();
const initialState = { currentuser: null };

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        currentuser: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        currentuser: null,
      };

    default:
      return state;
  }
};
const BlogContext = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  // console.log(state);

  const login = (userData, token) => {
    localStorage.setItem("blogtoken", JSON.stringify(token));
    dispatch({
      type: "LOGIN",
      payload: userData,
    });
  };
  const logout = () => {
    localStorage.removeItem("blogtoken");
    dispatch({
      type: "LOGOUT",
    });
  };

  useEffect(() => {
    async function getCurrentUser() {
      try {
        const token = JSON.parse(localStorage.getItem("blogtoken"));
        const response = await api.post("/currentuser", { token });
        if (response.data.success) {
          // console.log(response?.data?.currentuser, "currentuser");
          dispatch({
            type: "LOGIN",
            payload: response?.data?.currentuser,
          });
        }
      } catch (error) {
        console.log(error);
      }
    }

    getCurrentUser();
  }, []);

  return (
    <MyContext.Provider value={{ state, login, logout }}>
      {children}
    </MyContext.Provider>
  );
};

export default BlogContext;
