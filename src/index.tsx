import React from 'react';
import ReactDOM from 'react-dom/client';

import Home from './Home';
import NavBar from './NavBar';
import Products from './Products';
import Contact from './Contact';

import ShoppingCart from './ShoppingCart';

import CPU from './products/CPU';
import GPU from './products/GPU';
import PSU from './products/PSU';
import RAM from './products/RAM';
import MBD from './products/MBD';
import SSD from './products/SSD';
import Case from './products/Case';

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { Provider } from 'react-redux/es/exports';
import { store } from './app/store';

import './index.scss';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


root.render(
  <Provider store={store}>
    <Router>
      
      <NavBar />

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/products" element={<Products />} />

        <Route path="/shoppingcart" element={<ShoppingCart />} />

        <Route path="/contact" element={<Contact />} />

        {/* Ruta pentru pagina de CPU */}
        <Route path="/cpu" element={<CPU />} />

        {/* Ruta pentru pagina de GPU */}
        <Route path="/gpu" element={<GPU />} />

        {/* Ruta pentru pagina de PSU */}
        <Route path="/psu" element={<PSU />} />

        {/* Ruta pentru pagina de RAM */}
        <Route path="/ram" element={<RAM />} />

        {/* Ruta pentru pagina de placi de baza */}
        <Route path="/placi_baza" element={<MBD />} />

        {/* Ruta pentru pagina de SSD */}
        <Route path="/ssd" element={<SSD />} />

        {/* Ruta pentru pagina de Carcase */}
        <Route path="/carcase" element={<Case />} />
        
      </Routes>

    </Router>
  </Provider>
);
