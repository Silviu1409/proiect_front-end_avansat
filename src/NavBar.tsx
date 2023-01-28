import { useAuthState } from "react-firebase-hooks/auth";
import React, { useEffect } from 'react';
import { auth } from './dbconfig';
import { NavLink, Route, Routes } from "react-router-dom";

import Profile from './Profile';
import Auth from "./Auth";

import { ProtectedProfileRoute } from './ProtectedProfileRoute';
import { ProtectedAuthRoute } from "./ProtectedAuthRoute";

import './NavBar.scss';


function NavBar() {
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (loading){
        return;
    }
  }, [loading, user]);

  return (
    <div>
      <div className="navigation ">
        <center className="sigla">
          <img src="https://www.forit.ro/views/forit/images/layout/logo.png" alt="logo site"/>
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

                {
                  !user 
                    ?
                      <li className="nav-item">
                        <NavLink className="nav-link" to="/auth">
                          Auth
                        </NavLink>
                      </li>
                    : 
                      <li className="nav-item">
                        <NavLink className="nav-link" to="/profile">
                          Profil
                        </NavLink>
                      </li>
                }

                <li className="nav-item">
                  <NavLink className="nav-link" to="/products">
                    Products
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

      <Routes>
        {/* Ruta privata pentru pagina de Profil */}
        <Route element={<ProtectedAuthRoute user={user} />}>
          <Route element={<Auth />} path="/auth"/>
        </Route>
        
        {/* Ruta privata pentru pagina de Profil */}
        <Route element={<ProtectedProfileRoute user={user} />}>
          <Route element={<Profile user={user} />} path="/profile"/>
        </Route>
      </Routes>
    </div>
  );
}

export default NavBar;