import { Typography, FormControl, Select, MenuItem, SelectChangeEvent, FormLabel, RadioGroup, FormControlLabel, Radio, Button, Fab } from '@mui/material';
import { useEffect, useState } from 'react';
import { ISSD } from '../interfaces/ISSD';
import SSDItem from './SSDItem';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { NavLink } from 'react-router-dom';
import { useGetAllSSDsQuery, useGetSSDs_filterMutation } from '../store/SSDApi';
import { useSelector } from 'react-redux';

import "./Stil.scss";
import "./SSDStil.scss";


function SSD() {
    const {data, isLoading} = useGetAllSSDsQuery();
    const [getSSDs_filter] = useGetSSDs_filterMutation();
    const [SSDs, setSSDs] = useState(Array<ISSD>);
    const [sort, setSort] = useState("");
    const [filtrareFormFactor, setFiltrareFormFactor] = useState("");
    const noItemsCart = useSelector((state: any) => state.cart.cartNoItems < 10 ? state.cart.cartNoItems : "9+");


    const sorting = (sortare: string) => {
        switch(sortare){
            case "crescator": {
                SSDs.sort((a, b) => {return a.pret-b.pret});
                break;
            }
            case "descrescator": {
                SSDs.sort((a, b) => {return b.pret-a.pret});
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
            case "form_factor": {
                setFiltrareFormFactor(event.target.value);
                break;
            }
            default: {
                break;
            }
        }

        const res = await getSSDs_filter({field: field, val: event.target.value}).unwrap();

        if(res){
            setSSDs([...res]);
        }

        setSort("");
    }

    const resetFilters = () => {
        setFiltrareFormFactor("");

        if(data)
            setSSDs([...data]);
    }

    useEffect(() =>{
        if(isLoading){
            return;
        }
        else if(data){
            setSSDs([...data]);
        } else {
            setSSDs([]);
        }
    }, [isLoading, data]);


    return(
        <div className='pag_ssds'>
            <header className="pag_ssds-header">
                <Typography variant="h3" component="h3">
                    SSD-uri
                </Typography>
            </header>

            <div className="pag_ssds-content">
                <div className='filtre_ssds'>
                    <Typography variant="h5" component="h5">
                        Filtrare produse
                    </Typography>

                    <FormControl>
                        <FormLabel id="demo-radio-buttons-group-label" sx={{color: "white"}}>Form factor:</FormLabel>

                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            name="radio-buttons-group"
                            value={filtrareFormFactor}
                            onChange={event => handleFiltering(event, "form_factor")}
                            sx= {{color: "white"}}
                        >
                            <FormControlLabel value="M.2" control={<Radio sx={{color: "white"}}/>} label="M.2" />
                            <FormControlLabel value="2.5 inch" control={<Radio sx={{color: "white"}}/>} label="2.5 inch" />
                        </RadioGroup>
                    </FormControl>

                    <Button className='buton_add_cos' onClick={resetFilters} sx={{color: "white", backgroundColor: "red", borderRadius: "12px"}}>Reseteaza</Button>
                </div>

                <div className='rezultate'>
                    <div className='sortare_ssds'>
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
                            SSDs.map((data) => SSDItem(data))
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

export default SSD;