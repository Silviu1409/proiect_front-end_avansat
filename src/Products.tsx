import { Typography, Fab, Box } from '@mui/material';
import React from 'react';
import { NavLink } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import './Products.scss';


function Products() {
  return (
    <div className="products">
      <header className="products-header">
        <Typography variant="h1" component="h1">
            Products page
        </Typography>
      </header>

      <body>

        <div className="categories">
          <Box>
            <Typography variant="h4" component="h4">
              CPU
            </Typography>
            <NavLink to="/cpu">
              <Box className="procesoare" sx={{borderRadius: '20px'}}/>
            </NavLink>
          </Box>

          <Box>
            <Typography variant="h4" component="h4">
              GPU
            </Typography>
            <NavLink to="/gpu">
              <Box className="placi_video" sx={{borderRadius: '20px'}}/>
            </NavLink>
          </Box>

          <Box>
            <Typography variant="h4" component="h4">
              PSU
            </Typography>
            <NavLink to="/psu">
              <Box className="surse" sx={{borderRadius: '20px'}}/>
            </NavLink>
          </Box>

          <Box>
            <Typography variant="h4" component="h4">
              RAM
            </Typography>
            <NavLink to="/ram">
              <Box className="memorii_ram" sx={{borderRadius: '20px'}}/>
            </NavLink>
          </Box>

          <Box>
            <Typography variant="h4" component="h4">
              Placi de baza
            </Typography>
            <NavLink to="/placi_baza">
              <Box className="placi_baza" sx={{borderRadius: '20px'}}/>
            </NavLink>
          </Box>

          <Box>
            <Typography variant="h4" component="h4">
              SSD
            </Typography>
            <NavLink to="/ssd">
              <Box className="ssd" sx={{borderRadius: '20px'}}/>
            </NavLink>
          </Box>
        </div>

        <NavLink className="shoppingcart" to="/shoppingcart">
          <Fab color="secondary" aria-label="add">
            <ShoppingCartIcon />
          </Fab>
        </NavLink>
        
      </body>
    </div>
  );
}

export default Products;