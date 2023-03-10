import { useState } from "react";
import { app, auth } from "./dbconfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router";

import { Box, TextField, IconButton, Button } from '@mui/material';

import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PasswordOutlinedIcon from '@mui/icons-material/PasswordOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

import "./Stil.scss";


const db = getFirestore(app);

function Register(){
    const [email, setEmail] = useState("");
    const [passwd, setPasswd] = useState("");
    const [nume, setNume] = useState("");
    const [prenume, setPrenume] = useState("");

    const [showPassword, setShowPassword] = useState(false);

    const [emailUsedError, setEmailUsedError] = useState(false);
    const [emailInvalidError, setEmailInvalidError] = useState(false);
    const [passwdError, setPasswdError] = useState(false);


    const handleShowPassword = () => setShowPassword(!showPassword);

    const navigate = useNavigate();

    const register = async (event: any) => {
        try{
            event.preventDefault();

            createUserWithEmailAndPassword(auth, email, passwd)
            .then(async (res) => {

                await setDoc(doc(db, "users", res.user.uid), {
                    email: email,
                    nume: nume,
                    prenume: prenume,
                    nr_tel: "",
                });

                setEmail('');
                setPasswd('');
                setNume('');
                setPrenume('');

                navigate('/profile');
            })
            .catch((error) => {
                if(error.code === "auth/weak-password"){
                    setPasswdError(true);
                } else if(error.code === "auth/email-already-in-use"){
                    setEmailUsedError(true);
                } else if(error.code === "auth/invalid-email"){
                    setEmailInvalidError(true);
                }
                });
        } catch (error: any){
            console.log(error.message);
        }
    }
    

    return(
        <div className = "login">
            <label className="reg_title">REGISTER</label>

            <Box
                className = "field"
                sx = {{ display: 'flex', alignItems: 'flex-start' }}
            >
                <EmailOutlinedIcon sx = {{ color: '#E3F6F5', mr: 2, mt: 2 }} />
                <TextField
                    className="scriere"
                    autoComplete = "new-password"
                    variant = "outlined"
                    error = {emailUsedError || emailInvalidError}
                    helperText = {emailUsedError ? "Email deja utilizat" : emailInvalidError ? "Format nevalid de e-mail" : ""}
                    placeholder = "Email"
                    onChange = {(event) => {
                        if(emailUsedError){
                            setEmailUsedError(false);
                        } else if (emailInvalidError){
                            setEmailInvalidError(false);
                        }
                        setEmail(event.target.value);
                    }}
                    value = {email}
                />
            </Box>
            
            <Box
                className = "field"
                sx = {{ display: 'flex', alignItems: 'flex-start' }}
            >
                <PasswordOutlinedIcon sx = {{ color: '#E3F6F5', mr: 2, mt: 2 }} />
                <TextField
                    autoComplete = "new-password"
                    variant = "outlined"
                    className="scriere"
                    error = {passwdError}
                    helperText = {passwdError ? "Parola slaba" : ""}
                    type = {showPassword ? "text" : "password"}
                    placeholder = "Parola"
                    onChange = {(event) => {
                        if(passwdError){
                            setPasswdError(false);
                        }
                        setPasswd(event.target.value);
                    }}
                    value = {passwd}
                />
                <IconButton
                    onClick = { handleShowPassword }
                    sx = {{ color: '#E3F6F5', ml: 2, mt: 1 }}
                >
                    {!showPassword ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
                </IconButton>
            </Box>

            <Box
                className = "field"
                sx = {{ display: 'flex', alignItems: 'flex-start' }}
            >
                <AccountCircleOutlinedIcon sx = {{ color: '#E3F6F5', mr: 2, mt: 2 }} />
                <TextField
                    className="scriere"
                    autoComplete = "off"
                    variant = "outlined"
                    placeholder = "Nume"
                    onChange = {(event) => {
                        setNume(event.target.value);
                    }}
                    value = {nume}
                />
            </Box>

            <Box
                className = "field"
                sx = {{ display: 'flex', alignItems: 'flex-start' }}
            >
                <AccountCircleOutlinedIcon sx = {{ color: '#E3F6F5', mr: 2, mt: 2 }} />
                <TextField
                    autoComplete = "off"
                    className="scriere"
                    variant = "outlined"
                    placeholder = "Prenume"
                    onChange = {(event) => {
                        setPrenume(event.target.value);
                    }}
                    value = {prenume}
                />
            </Box>

            <Button 
                className = "butonRegister"
                variant = "contained"
                onClick={(event) => {
                    register(event);
                    }}>
                        Register
            </Button>
        </div>
    );
}

export default Register;