import React from "react";
import "./Navigation.css";

const Navigation = () => {

  return (
    <div>
      <div className="navbar_wrapper">
        <div className="logo_wrapper">
          <img
            src="/img/norsalogo.png"
            className="img-fluid"
            alt="logo"
            style={{ width: "150px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Navigation;
