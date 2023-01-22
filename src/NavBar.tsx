import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import './NavBar.scss';


function NavBar() {
  return (
    <div className="navigation ">
      <center className="sigla">
        <img src="https://www.forit.ro/views/forit/images/layout/logo.png"/>
      </center>

      <nav className="navbar navbar-expand  ">
        <div className="container">

          <div>
            <ul className="navbar-nav ml-auto menu">

              <li className="nav-item">
                <NavLink className="nav-link" to="/">
                  Home
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link" to="/login">
                  Login
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link" to="/products">
                  Products
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link" to="/profile">
                  Profile
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link" to="/shoppingcart">
                  ShoppingCart
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link" to="/contact">
                  Contact
                </NavLink>
              </li>
              
            </ul>
          </div>
          
        </div>
      </nav>
    </div>
  );
}

export default NavBar;