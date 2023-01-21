import { Typography } from '@mui/material';
import React from 'react';

import './Home.css';


function Profile() {

  return (
    <div className="Home">
      <header className="Home-header">
        <Typography variant="h1" component="h1">
            Profile page
        </Typography>
      </header>
    </div>
  );
}

export default Profile;