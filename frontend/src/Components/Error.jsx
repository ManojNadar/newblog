import React from "react";
import "../Styles/Error.css";
import { useNavigate } from "react-router-dom";

const Error = () => {
  const route = useNavigate();
  return (
    <>
      <div className="mainErrorpage">
        <div className="errorSection">
          <h3 className="wrongWay">ALERT - WRONG WAY BUDDY</h3>
          <br />
          <button onClick={() => route("/")} className="getBack">
            GET BACK TO HOME
          </button>
        </div>
      </div>
    </>
  );
};

export default Error;
