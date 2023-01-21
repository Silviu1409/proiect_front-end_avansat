import React from 'react';
import ReactDOM from 'react-dom/client';

import Home from './Home';
import Login from './Login';
import NavBar from './NavBar';
import Products from './Products';
import Contact from './Contact';
import Profile from './Profile';

import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";

import './index.scss';
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

      {/* Ruta pentru pagina de CPU */}
      <Route path="/cpu" element={<Products />} />

      {/* Ruta pentru pagina de GPU */}
      <Route path="/gpu" element={<Products />} />

      {/* Ruta pentru pagina de PSU */}
      <Route path="/psu" element={<Products />} />

      {/* Ruta pentru pagina de RAM */}
      <Route path="/ram" element={<Products />} />

      {/* Ruta default */}
      <Route path="*" element={<Navigate to="/" />} />
      
    </Routes>

  </Router>
);
