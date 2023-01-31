import { Box, TextField, Button } from '@mui/material';
import { sendPasswordResetEmail } from 'firebase/auth';
import { useState } from 'react';
import { auth } from './dbconfig';

import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';

import "./Stil.scss";


function Reset(){
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState(false);

    const sendPasswordReset = async (event: any) => {
        try {
            event.preventDefault();

            await sendPasswordResetEmail(auth, email);
            
            setEmail('');

            alert("Password reset link sent!");
        } catch (error: any) {
            if(error.code === "auth/invalid-email"){
                setEmailError(true);
            } else if (error.code === "auth/user-not-found"){
                setEmailError(true);
            }
        }
    };

    return(
        <div className = "reset">
            <label className='reset_title'>RESET PASSWORD</label>

            <Box
                className = "field"
                sx = {{ display: 'flex', alignItems: 'flex-start' }}
            >
                <EmailOutlinedIcon sx = {{ color: '#E3F6F5', mr: 2, mt: 2 }} />
                <TextField
                    variant = "outlined"
                    className="scriere"
                    error = {emailError}
                    helperText = {emailError ? "Email inexistent" : ""}
                    placeholder = "Email"
                    onChange = {(event) => {
                        if(emailError){
                            setEmailError(false);
                        }
                        setEmail(event.target.value);
                    }}
                    value = {email}
                />
            </Box>

            <Button 
                className = "butonReset"
                variant = "contained"
                onClick={(event) => {
                    sendPasswordReset(event);
                    }}>
                        Reset
            </Button>
        </div>
    );
}

export default Reset;