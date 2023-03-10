import { Typography, FormControl, Select, MenuItem, SelectChangeEvent, FormLabel, RadioGroup, FormControlLabel, Radio, Button, Fab } from '@mui/material';
import { useEffect, useState } from 'react';
import { IPSU } from '../interfaces/IPSU';
import PSUItem from './PSUItem';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { NavLink } from 'react-router-dom';
import { useGetAllPSUsQuery, useGetPSUs_filterMutation } from '../store/PSUApi';
import { useSelector } from 'react-redux';

import "./Stil.scss";
import "./PSUStil.scss";


function PSU() {
    const {data, isLoading} = useGetAllPSUsQuery();
    const [getPSUs_filter] = useGetPSUs_filterMutation();
    const [PSUs, setPSUs] = useState(Array<IPSU>);
    const [sort, setSort] = useState("");
    const [filtrareCert, setFiltrareCert] = useState("");
    const [filtrareModulara, setFiltrareModulara] = useState("");
    const noItemsCart = useSelector((state: any) => state.cart.cartNoItems < 10 ? state.cart.cartNoItems : "9+");


    const sorting = (sortare: string) => {
        switch(sortare){
            case "crescator": {
                PSUs.sort((a, b) => {return a.pret-b.pret});
                break;
            }
            case "descrescator": {
                PSUs.sort((a, b) => {return b.pret-a.pret});
                break;
            }
            default: {
                break;
            }
        }
    }

    const handleSorting = (event: SelectChangeEvent) => {
        setSort(event.target.value);

        sorting(event.target.value);
    }

    const handleFiltering = async (event: SelectChangeEvent, field: string) => {
        switch(field){
            case "certificare": {
                setFiltrareCert(event.target.value);
                setFiltrareModulara("");
                break;
            }
            case "modulara": {
                setFiltrareModulara(event.target.value);
                setFiltrareCert("");
                break;
            }
            default: {
                break;
            }
        }

        const res = await getPSUs_filter({field: field, val: event.target.value}).unwrap();

        if(res){
            setPSUs([...res]);
        }

        setSort("");
    }

    const resetFilters = () => {
        setFiltrareModulara("");
        setFiltrareCert("");

        if(data)
            setPSUs([...data]);
    }

    useEffect(() =>{
        if(isLoading){
            return;
        }
        else if(data){
            setPSUs([...data]);
        } else {
            setPSUs([]);
        }
    }, [isLoading, data]);


    return(
        <div className='pag_psus'>
            <header className="pag_psus-header">
                <Typography variant="h3" component="h3">
                    Surse
                </Typography>
            </header>

            <div className="pag_psus-content">
                <div className='filtre_psus'>
                    <Typography variant="h5" component="h5">
                        Filtrare produse
                    </Typography>

                    <FormControl>
                        <FormLabel id="demo-radio-buttons-group-label" sx={{color: "white"}}>Certificare :</FormLabel>

                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            name="radio-buttons-group"
                            value={filtrareCert}
                            onChange={event => handleFiltering(event, "certificare")}
                            sx= {{color: "white"}}
                        >
                            <FormControlLabel value="80+ Bronze" control={<Radio sx={{color: "white"}}/>} label="80+ Bronze" />
                            <FormControlLabel value="80+ Gold" control={<Radio sx={{color: "white"}}/>} label="80+ Gold" />
                            <FormControlLabel value="80+ Platinum" control={<Radio sx={{color: "white"}}/>} label="80+ Platinum" />
                            <FormControlLabel value="80+ Titanium" control={<Radio sx={{color: "white"}}/>} label="80+ Titanium" />
                        </RadioGroup>
                    </FormControl>

                    <FormControl>
                        <FormLabel id="demo-radio-buttons-group-label" sx={{color: "white"}}>Modulara :</FormLabel>

                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            name="radio-buttons-group"
                            value={filtrareModulara}
                            onChange={event => handleFiltering(event, "modulara")}
                            sx= {{color: "white"}}
                        >
                            <FormControlLabel value="Nu" control={<Radio sx={{color: "white"}}/>} label="Nu" />
                            <FormControlLabel value="Da, Semi Modulara" control={<Radio sx={{color: "white"}}/>} label="Da, Semi Modulara" />
                            <FormControlLabel value="Da, Full Modulara" control={<Radio sx={{color: "white"}}/>} label="Da, Full Modulara" />
                        </RadioGroup>
                    </FormControl>

                    <Button className='buton_add_cos' onClick={resetFilters} sx={{color: "white", backgroundColor: "red", borderRadius: "12px"}}>Reseteaza</Button>
                </div>

                <div className='rezultate'>
                    <div className='sortare_psus'>
                        <FormControl fullWidth>
                            <Typography variant="h6" component="h6">
                                Sortare produse:
                            </Typography>

                            <Select
                                value={sort}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                                onChange={handleSorting}
                                sx={{
                                    color: "#222430",
                                    maxWidth: "10vw",
                                    fontFamily: "Varela Round",
                                    fontSize: "20px",
                                    height: "5vh",
                                    marginLeft: "2vw",
                                    backgroundColor: "white"
                                }}
                            >
                                <MenuItem value={"crescator"}>Pret crescator</MenuItem>
                                <MenuItem value={"descrescator"}>Pret descrescator</MenuItem>
                            </Select>
                        </FormControl>
                    </div>

                    <div className='contents'>
                        {
                            PSUs.map((data) => PSUItem(data))
                        }
                    </div>
                </div>
            </div>

            <NavLink className="shoppingcart" to="/shoppingcart">
                <Fab color="secondary" aria-label="add">
                    <ShoppingCartIcon />
                    <p className='noOfItemsinCart'>{noItemsCart}</p>
                </Fab>
            </NavLink>
        </div>
    )
}

export default PSU;