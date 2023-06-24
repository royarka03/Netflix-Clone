import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
  return <div className="bar">
    <div className="left">
      <img src="images/netflix_logo.png" alt="" className="logo" />
    </div>
    <div className="right">
      <select name="" className="langSelect">
        <option value="">English</option>
        <option value="">Hindi</option>
      </select>
      <Link to="/Login">
        <button className="signinbtn">Sign In</button>
      </Link>
    </div>
  </div>;
}

export default Navbar;