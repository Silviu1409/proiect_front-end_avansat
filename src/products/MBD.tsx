import { Typography, FormControl, Select, MenuItem, SelectChangeEvent, FormLabel, RadioGroup, FormControlLabel, Radio, Button, Fab } from '@mui/material';
import { useEffect, useState } from 'react';
import { IMBD } from '../interfaces/IMBD';
import MBDItem from './MBDItem';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { NavLink } from 'react-router-dom';
import { useGetAllMBDsQuery, useGetMBDs_filterMutation } from '../store/MBDApi';

import "./Stil.scss";
import "./MBDStil.scss";


function MBD() {
    const {data, isLoading} = useGetAllMBDsQuery();
    const [getMBDs_filter] = useGetMBDs_filterMutation();
    const [MBDs, setMBDs] = useState(Array<IMBD>);
    const [sort, setSort] = useState("");
    const [filtrareSocket, setFiltrareSocket] = useState("");
    const [filtrareTip, setFiltrareTip] = useState("");
    const [filtrareM2, setFiltrareM2] = useState("");


    const sorting = (sortare: string) => {
        switch(sortare){
            case "crescator": {
                MBDs.sort((a, b) => {return a.pret-b.pret});
                break;
            }
            case "descrescator": {
                MBDs.sort((a, b) => {return b.pret-a.pret});
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
            case "socket": {
                setFiltrareSocket(event.target.value);
                setFiltrareTip("");
                setFiltrareM2("");
                break;
            }
            case "tip_memorie": {
                setFiltrareTip(event.target.value);
                setFiltrareSocket("");
                setFiltrareM2("");
                break;
            }
            case "M2": {
                setFiltrareM2(event.target.value);
                setFiltrareSocket("");
                setFiltrareTip("");
                break;
            }
            default: {
                break;
            }
        }

        const res = await getMBDs_filter({field: field, val: event.target.value}).unwrap();

        if(res){
            setMBDs([...res]);
        }

        setSort("");
    }

    const resetFilters = () => {
        setFiltrareSocket("");
        setFiltrareTip("");
        setFiltrareM2("");

        if(data)
            setMBDs([...data]);
    }

    useEffect(() =>{
        if(isLoading){
            return;
        }
        else if(data){
            setMBDs([...data]);
        } else {
            setMBDs([]);
        }
    }, [isLoading, data]);


    return(
        <div className='pag_mbds'>
            <header className="pag_mbds-header">
                <Typography variant="h3" component="h3">
                    Placi de baza
                </Typography>
            </header>

            <div className="pag_mbds-content">
                <div className='filtre_mbds'>
                    <Typography variant="h5" component="h5">
                        Filtrare produse
                    </Typography>

                    <FormControl>
                        <FormLabel id="demo-radio-buttons-group-label" sx={{color: "white"}}>Soclu :</FormLabel>

                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            name="radio-buttons-group"
                            value={filtrareSocket}
                            onChange={event => handleFiltering(event, "socket")}
                            sx= {{color: "white"}}
                        >
                            <FormControlLabel value="1200" control={<Radio sx={{color: "white"}}/>} label="1200" />
                            <FormControlLabel value="1700" control={<Radio sx={{color: "white"}}/>} label="1700" />
                            <FormControlLabel value="AM4" control={<Radio sx={{color: "white"}}/>} label="AM4" />
                            <FormControlLabel value="AM5" control={<Radio sx={{color: "white"}}/>} label="AM5" />
                        </RadioGroup>
                    </FormControl>

                    <FormControl>
                        <FormLabel id="demo-radio-buttons-group-label" sx={{color: "white"}}>Tip memorie :</FormLabel>

                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            name="radio-buttons-group"
                            value={filtrareTip}
                            onChange={event => handleFiltering(event, "tip_memorie")}
                            sx= {{color: "white"}}
                        >
                            <FormControlLabel value="DDR4" control={<Radio sx={{color: "white"}}/>} label="DDR4" />
                            <FormControlLabel value="DDR5" control={<Radio sx={{color: "white"}}/>} label="DDR5" />
                        </RadioGroup>
                    </FormControl>

                    <FormControl>
                        <FormLabel id="demo-radio-buttons-group-label" sx={{color: "white"}}>M.2 :</FormLabel>

                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            name="radio-buttons-group"
                            value={filtrareM2}
                            onChange={event => handleFiltering(event, "M2")}
                            sx= {{color: "white"}}
                        >
                            <FormControlLabel value="Nu" control={<Radio sx={{color: "white"}}/>} label="Nu" />
                            <FormControlLabel value="1" control={<Radio sx={{color: "white"}}/>} label="1" />
                            <FormControlLabel value="2" control={<Radio sx={{color: "white"}}/>} label="2" />
                            <FormControlLabel value="3" control={<Radio sx={{color: "white"}}/>} label="3" />
                        </RadioGroup>
                    </FormControl>

                    <Button className='buton_add_cos' onClick={resetFilters} sx={{color: "white", backgroundColor: "red", borderRadius: "12px"}}>Reseteaza</Button>
                </div>

                <div className='rezultate'>
                    <div className='sortare_mbds'>
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
                            MBDs.map((data) => MBDItem(data))
                        }
                    </div>
                </div>
            </div>

            <NavLink className="shoppingcart" to="/shoppingcart">
                <Fab color="secondary" aria-label="add">
                    <ShoppingCartIcon />
                </Fab>
            </NavLink>
        </div>
    )
}

export default MBD;