import React from 'react';

import Login from './Login';
import Register from './Register';
import Reset from './Reset';

import './Stil.scss';


function Auth() {

  return (
    <div className="Auth">
      <br/><br/><br/>
      <Login />
      <br/><br/><br/><br/>
      <Register />
      <br/><br/><br/><br/>
      <Reset />
      <br/><br/><br/>
    </div>
  );
}

export default Auth;