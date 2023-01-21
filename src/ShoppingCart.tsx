import { Typography } from '@mui/material';
import React from 'react';

import './Home.scss';


function ShoppingCart() {

  return (
    <div className="Home">
      <header className="Home-header">
        <Typography variant="h1" component="h1">
            ShoppingCart page
        </Typography>
      </header>
    </div>
  );
}

export default ShoppingCart;