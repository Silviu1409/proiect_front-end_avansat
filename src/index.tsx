import React from 'react';
import ReactDOM from 'react-dom/client';

import Home from './Home';
import Login from './Login';
import NavBar from './NavBar';
import Products from './Products';
import Contact from './Contact';
import Profile from './Profile';

import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";

import './index.css';
import ShoppingCart from './ShoppingCart';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Router>
    
    <NavBar />

    <Routes>

      {/* Ruta pentru pagina de Home */}
      <Route path="/" element={<Home />} />

      {/* Ruta pentru pagina de Login */}
      <Route path="/login" element={<Login />} />

      {/* Ruta pentru pagina de Produse */}
      <Route path="/products" element={<Products />} />

      {/* Ruta pentru pagina de Profil */}
      <Route path="/profile" element={<Profile />} />

      {/* Ruta pentru pagina de Shopping Cart */}
      <Route path="/shoppingcart" element={<ShoppingCart />} />

      {/* Ruta pentru pagina de Contact */}
      <Route path="/contact" element={<Contact />} />

      {/* Ruta default */}
      <Route path="*" element={<Navigate to="/" />} />
      
    </Routes>

  </Router>
);
