import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from './Home';
import NavBar from './NavBar';
import Products from './Products';
import Contact from './Contact';
import ShoppingCart from './ShoppingCart';
import Auth from "./Auth";
import Profile from "./Profile";
import CPU from './products/CPU';
import GPU from './products/GPU';
import PSU from './products/PSU';
import RAM from './products/RAM';
import MBD from './products/MBD';
import SSD from './products/SSD';
import Case from './products/Case';

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./dbconfig";
import { useEffect } from "react";

import { ProtectedAuthRoute } from "./ProtectedAuthRoute";
import { ProtectedProfileRoute } from "./ProtectedProfileRoute";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";


function App(){
    const [user, loading] = useAuthState(auth);

    useEffect(() => {
        if (loading){
            return;
        }
    }, [loading, user]);

    return(
        <Router>
            <ToastContainer />

            <NavBar user={user}/>

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
                
                {/* Ruta privata pentru pagina de Profil */}
                <Route element={<ProtectedAuthRoute user={user} />}>
                    <Route element={<Auth />} path="/auth"/>
                </Route>
                
                {/* Ruta privata pentru pagina de Profil */}
                <Route element={<ProtectedProfileRoute user={user} />}>
                    <Route element={<Profile user={user} />} path="/profile"/>
                </Route>
            </Routes>
        </Router>
    );
}

export default App;