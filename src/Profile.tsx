import { doc, getDoc, getFirestore } from '@firebase/firestore';
import { Button, Typography } from '@mui/material';
import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { app, auth } from './dbconfig';

import './Stil.scss';


const db = getFirestore(app);


function Profile(user: any) {
  const [det_user, setDet_user] = useState({email: "", nume: "", prenume: ""});

  async function get_detalii_user(){
    const ref = doc(db, "users", user.user.uid);

    await getDoc(ref)
    .then(async (response) => {
        let res = response.data();
        
        if (res)
          setDet_user({
            email: res.email,
            nume: res.nume,
            prenume: res.prenume
          });
    })
    .catch((e) => console.log(e));
  }

  const logout = () => {
    signOut(auth);
  }

  useEffect(() => {
    get_detalii_user();
  }, []);

  return (
    <div className="Profile">
      <header className="Profile-header">
        <Typography variant="h3" component="h3">
            Profile page
        </Typography>
      </header>

      <div className="profile_content">
        <Typography variant="h5" component="h5">
          Email: {det_user?.email}
        </Typography>

        <Typography variant="h5" component="h5">
          Nume: {det_user?.nume}
        </Typography>

        <Typography variant="h5" component="h5">
          Prenume: {det_user?.prenume}
        </Typography>
      </div>

      <Link to="/">
        <Button 
          className = "buton"
          variant = "contained"
          onClick={() => {
              logout();
              }}>
                  Logout
        </Button>
      </Link>
    </div>
  );
}

export default Profile;