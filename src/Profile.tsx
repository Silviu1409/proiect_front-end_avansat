import { doc, getDoc, getFirestore } from '@firebase/firestore';
import { Box, Button, TextField, Typography } from '@mui/material';
import { signOut } from 'firebase/auth';
import { updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { app, auth } from './dbconfig';

import './Home.scss';


const db = getFirestore(app);


function Profile(user: any) {
  const [nume, setNume] = useState("");
  const [prenume, setPrenume] = useState("");
  const [email, setEmail] = useState("");
  const [nr_tel, setNr_tel] = useState("");
  const [data_nastere, setData_nastere] = useState({zi: "", luna: "", an: ""});
  const [comenzi, setComenzi] = useState([]);

  const id = user.user.uid;

  async function get_detalii_user(){
    const ref = doc(db, "users", id);

    await getDoc(ref)
    .then(async (response) => {
        let res = response.data();
        
        if (res){
          setNume(res.nume);
          setPrenume(res.prenume);
          setEmail(res.email);
          setNr_tel(res.nr_tel);
          setData_nastere(res.data_nastere);
          setComenzi(res.comenzi);
        }
    })
    .catch((e) => console.log(e));
  }

  const handleSubmit = (event: any) => {

    const ref = doc(db, "contract", id);

    updateDoc(ref, {
      email: email,
      nume: nume,
      prenume: prenume,
      nr_tel: nr_tel,
      data_nastere: data_nastere,
      comenzi: comenzi
    });     
    
    event.preventDefault();
    alert(`S-au actualizat detaliile contului`);
  }

  const logout = () => {
    signOut(auth);
  }

  useEffect(() => {
    get_detalii_user();
  }, []);

  return (
    <div className="profile">
      <header className="profile-header">
        <Typography variant="h3" component="h3">
            Profilul meu
        </Typography>
      </header>
      
      <div className="profile_content">
        <form className='profile_form' onSubmit={handleSubmit}> 
          <div>

            <Typography variant="h5" component="h5">
              Email: {email}
            </Typography>

            <Box
                className = "field"
                sx = {{ display: 'flex', width: "fit-content", columnGap: "1.5vw" }}
            >
                <label className='scris'>Nume: </label> 
                <TextField
                    className = "raspuns"
                    variant = "outlined"
                    placeholder = {nume}
                    onChange = {(e) => {
                        setNume(e.target.value);
                    }}
                    value = {nume}
                    sx = {{
                      borderWidth: "1px",
                      borderRadius: "12px",
                      borderColor: "white",
                      borderStyle: "solid",
                      input: {color: "white"},
                    }}
                />
            </Box>

            <Box
                className = "field"
                sx = {{ display: 'flex', width: "fit-content", columnGap: "1.5vw" }}
            >
                <label className='scris'>Prenume: </label> 
                <TextField
                    className = "raspuns"
                    variant = "outlined"
                    placeholder = {prenume}
                    onChange = {(e) => {
                        setPrenume(e.target.value);
                    }}
                    value = {prenume}
                    sx={{
                      borderWidth: "1px",
                      borderRadius: "12px",
                      borderColor: "white",
                      borderStyle: "solid",
                      input: {color: "white"}
                    }}
                />
            </Box>

            <Box
                className = "field"
                sx = {{ display: 'flex', width: "fit-content", columnGap: "1.5vw" }}
            >
                <label className='scris'>Nr. telefon: </label> 
                <TextField
                    className = "raspuns"
                    variant = "outlined"
                    placeholder = {nr_tel}
                    onChange = {(e) => {
                        setNr_tel(e.target.value);
                    }}
                    value = {nr_tel}
                    sx={{
                      borderWidth: "1px",
                      borderRadius: "12px",
                      borderColor: "white",
                      borderStyle: "solid",
                      input: {color: "white"}
                    }}
                />
            </Box>

            <Typography variant="h5" component="h5" className='field'>
              Data nasterii:
            </Typography>

            <Box
                className = "field"
                sx = {{ display: 'flex', width: "fit-content", columnGap: "1.5vw" }}
            >
                <label className='scris'>Zi:</label>
                <TextField
                    className = "raspuns"
                    variant = "outlined"
                    placeholder = {data_nastere.zi}
                    onChange = {(e) => {
                        setData_nastere({zi: e.target.value, luna: data_nastere.luna, an: data_nastere.an});
                    }}
                    value = {data_nastere.zi}
                    sx={{
                      borderWidth: "1px",
                      borderRadius: "12px",
                      borderColor: "white",
                      borderStyle: "solid",
                      input: {color: "white"}
                    }}
                />

                <label className='scris'>Luna:</label>
                <TextField
                    className = "raspuns"
                    variant = "outlined"
                    placeholder = {data_nastere.luna}
                    onChange = {(e) => {
                        setData_nastere({zi: data_nastere.zi, luna: e.target.value, an: data_nastere.an});
                    }}
                    value = {data_nastere.luna}
                    sx={{
                      borderWidth: "1px",
                      borderRadius: "12px",
                      borderColor: "white",
                      borderStyle: "solid",
                      input: {color: "white"}
                    }}
                />

                <label className='scris'>An:</label>
                <TextField
                    className = "raspuns"
                    variant = "outlined"
                    placeholder = {data_nastere.an}
                    onChange = {(e) => {
                        setData_nastere({zi: data_nastere.zi, luna: data_nastere.luna, an: e.target.value});
                    }}
                    value = {data_nastere.an}
                    sx={{
                      borderWidth: "1px",
                      borderRadius: "12px",
                      borderColor: "white",
                      borderStyle: "solid",
                      input: {color: "white"}
                    }}
                />
            </Box>

          </div>

          <Button className='b1' type='submit' >Update</Button>
          
        </form>

        <Link to="/" className = "buton_logout">
          <Button 
            
            variant = "contained"
            color = "error"
            onClick={() => {
                logout();
                }}>
                    Logout
          </Button>
        </Link>
      </div>

      
    </div>
  );
}

export default Profile;