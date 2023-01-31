import { NavLink } from "react-router-dom";

import './NavBar.scss';


function NavBar(user: any) {
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
                  !user.user 
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
    </div>
  );
}

export default NavBar;