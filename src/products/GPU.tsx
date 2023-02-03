import { Typography, FormControl, Select, MenuItem, SelectChangeEvent, FormLabel, RadioGroup, FormControlLabel, Radio, Button, Fab } from '@mui/material';
import { useEffect, useState } from 'react';
import { IGPU } from '../interfaces/IGPU';
import GPUItem from './GPUItem';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { NavLink } from 'react-router-dom';
import { useGetAllGPUsQuery, useGetGPUs_filterMutation } from '../store/GPUApi';
import { useSelector } from 'react-redux';

import "./Stil.scss";
import "./GPUStil.scss";


function GPU() {
    const {data, isLoading} = useGetAllGPUsQuery();
    const [getGPUs_filter] = useGetGPUs_filterMutation();
    const [GPUs, setGPUs] = useState(Array<IGPU>);
    const [sort, setSort] = useState("");
    const [filtrareChipset, setFiltrareChipset] = useState("");
    const [filtrareMemorie, setFiltrareMemorie] = useState("");
    const noItemsCart = useSelector((state: any) => state.cart.cartNoItems < 10 ? state.cart.cartNoItems : "9+");


    const sorting = (sortare: string) => {
        switch(sortare){
            case "crescator": {
                GPUs.sort((a, b) => {return a.pret-b.pret});
                break;
            }
            case "descrescator": {
                GPUs.sort((a, b) => {return b.pret-a.pret});
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
            case "chipset": {
                setFiltrareChipset(event.target.value);
                setFiltrareMemorie("");
                break;
            }
            case "size_memorie": {
                setFiltrareMemorie(event.target.value);
                setFiltrareChipset("");
                break;
            }
            default: {
                break;
            }
        }

        const res = await getGPUs_filter({field: field, val: event.target.value}).unwrap();

        if(res){
            setGPUs([...res]);
        }

        setSort("");
    }

    const resetFilters = () => {
        setFiltrareChipset("");
        setFiltrareMemorie("");

        if(data)
            setGPUs([...data]);
    }

    useEffect(() =>{
        if(isLoading){
            return;
        }
        else if(data){
            setGPUs([...data]);
        } else {
            setGPUs([]);
        }
    }, [isLoading, data]);


    return(
        <div className='pag_gpus'>
            <header className="pag_gpus-header">
                <Typography variant="h3" component="h3">
                    Placi video
                </Typography>
            </header>

            <div className="pag_gpus-content">
                <div className='filtre_gpus'>
                    <Typography variant="h5" component="h5">
                        Filtrare produse
                    </Typography>

                    <FormControl>
                        <FormLabel id="demo-radio-buttons-group-label" sx={{color: "white"}}>Chipset :</FormLabel>

                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            name="radio-buttons-group"
                            value={filtrareChipset}
                            onChange={event => handleFiltering(event, "chipset")}
                            sx= {{color: "white"}}
                        >
                            <FormControlLabel value="NVIDIA" control={<Radio sx={{color: "white"}}/>} label="NVIDIA" />
                            <FormControlLabel value="AMD" control={<Radio sx={{color: "white"}}/>} label="AMD" />
                        </RadioGroup>
                    </FormControl>

                    <FormControl>
                        <FormLabel id="demo-radio-buttons-group-label" sx={{color: "white"}}>Dimensiune memorie :</FormLabel>

                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            name="radio-buttons-group"
                            value={filtrareMemorie}
                            onChange={event => handleFiltering(event, "size_memorie")}
                            sx= {{color: "white"}}
                        >
                            <FormControlLabel value="4 GB" control={<Radio sx={{color: "white"}}/>} label="4 GB" />
                            <FormControlLabel value="8 GB" control={<Radio sx={{color: "white"}}/>} label="8 GB" />
                            <FormControlLabel value="12 GB" control={<Radio sx={{color: "white"}}/>} label="12 GB" />
                            <FormControlLabel value="16 GB" control={<Radio sx={{color: "white"}}/>} label="16 GB" />
                            <FormControlLabel value="24 GB" control={<Radio sx={{color: "white"}}/>} label="24 GB" />
                        </RadioGroup>
                    </FormControl>

                    <Button className='buton_add_cos' onClick={resetFilters} sx={{color: "white", backgroundColor: "red", borderRadius: "12px"}}>Reseteaza</Button>
                </div>

                <div className='rezultate'>
                    <div className='sortare_gpus'>
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
                            GPUs.map((data) => GPUItem(data))
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

export default GPU;