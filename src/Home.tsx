import { Typography } from '@mui/material';
import React, { useEffect } from 'react';
import {test} from './controllers/test';

import './Home.scss';


function Home() {
  // useEffect(() => {
  //     test();
  // });

  return (
    <div className="Home">
      <header className="Home-header">
        <Typography variant="h1" component="h1">
          Home page
        </Typography>
      </header>
    </div>
  );
}

export default Home;
