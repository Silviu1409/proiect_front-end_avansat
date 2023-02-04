import { doc, getDoc, getFirestore } from '@firebase/firestore';
import { Box, Button, TextField, Typography } from '@mui/material';
import { signOut } from 'firebase/auth';
import { updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { app, auth } from './dbconfig';
import { useGet_ordersQuery } from './store/cartApi';
import ProfileOrderItem from './ProfileOrderItem';


import './Home.scss';


const db = getFirestore(app);

function Profile(user: any) {
  const [nume, setNume] = useState("");
  const [prenume, setPrenume] = useState("");
  const [email, setEmail] = useState("");
  const [nr_tel, setNr_tel] = useState("");

  const {data, isLoading} = useGet_ordersQuery(user.user.uid);
  const [orders, setOrders] = useState([]);

  const ver_tel = new RegExp('^(07[2-8]{1}[0-9]{7})$');

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
        }
    })
    .catch((e) => console.log(e));
  }

  const handleSubmit = (event: any) => {
    if(ver_tel.test(nr_tel)){
      const ref = doc(db, "users", id);

      updateDoc(ref, {
        email: email,
        nume: nume,
        prenume: prenume,
        nr_tel: nr_tel,
      });     
      
      event.preventDefault();
      alert(`S-au actualizat detaliile contului`);
    } else {
      event.preventDefault();
      
      toast.error(`Format numar telefon gresit!`, {position: "bottom-left"});
    }
  }

  const logout = () => {
    signOut(auth);
  }

  useEffect(() => {
    get_detalii_user();
    if(isLoading){
      return;
    }
    else if(data){
      setOrders([...data]);
    } else {
      setOrders([]);
  }
}, [isLoading, data]);


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
                    inputProps = {{ maxLength: 10 }}
                />
            </Box>

          </div>

          <Button 
            className = 'submit'
            type = 'submit'
            variant = "contained"
            color = "warning">
              Update
          </Button>
        </form>

        { orders.length !== 0
            ?
              <div className='order-history'>
                <Typography variant="h5" component="h5">
                  Comenzi plasate:
                </Typography>

                { orders.map((item: any) => ProfileOrderItem(item)) }
              </div>
            :
              <div className='order-history'>
                <Typography variant="h5" component="h5">
                  Nu ai plasat nicio comanda!
                </Typography>
              </div>
        }
      </div>
      
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
  );
}

export default Profile;