import { Typography, FormControl, Select, MenuItem, SelectChangeEvent, FormLabel, RadioGroup, FormControlLabel, Radio, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getRAMs, getRAMs_filter } from '../controllers/RAM_Controller';
import { IRAM } from '../interfaces/IRAM';
import RAMItem from './RAMItem';


import "./RAMStil.scss";


function RAM() {
    const [RAMs, setRAMs] = useState(Array<IRAM>);
    const [sort, setSort] = useState("");
    const [filtrareCapacitate, setFiltrareCapacitate] = useState("");
    const [filtrareTip, setFiltrareTip] = useState("");


    const sorting = (sortare: string) => {
        switch(sortare){
            case "crescator": {
                RAMs.sort((a, b) => {return a.pret-b.pret});
                break;
            }
            case "descrescator": {
                RAMs.sort((a, b) => {return b.pret-a.pret});
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

    const handleFiltering = (event: SelectChangeEvent, field: string) => {
        switch(field){
            case "capacitate": {
                setFiltrareCapacitate(event.target.value);
                setFiltrareTip("");
                break;
            }
            case "tip": {
                setFiltrareTip(event.target.value);
                setFiltrareCapacitate("");
                break;
            }
            default: {
                break;
            }
        }

        getRAMs_filter(field, event.target.value)
        .then((data) => {
            setRAMs(data);
        });

        setSort("");
    }

    const resetFilters = () => {
        setFiltrareCapacitate("");
        setFiltrareTip("");

        getRAMs().then((data) => {
            setRAMs(data);
        });
    }

    useEffect(() =>{
        getRAMs().then((data) => {
            setRAMs(data);
        });
    }, []);


    return(
        <div className='pag_rams'>
            <header className="pag_rams-header">
                <Typography variant="h3" component="h3">
                    Memorii RAM
                </Typography>
            </header>

            <div className="pag_rams-content">
                <div className='filtre_rams'>
                    <Typography variant="h5" component="h5">
                        Filtrare produse
                    </Typography>

                    <FormControl>
                        <FormLabel id="demo-radio-buttons-group-label" sx={{color: "white"}}>Capacitate :</FormLabel>

                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            name="radio-buttons-group"
                            value={filtrareCapacitate}
                            onChange={event => handleFiltering(event, "capacitate")}
                            sx= {{color: "white"}}
                        >
                            <FormControlLabel value="4 GB" control={<Radio sx={{color: "white"}}/>} label="4 GB" />
                            <FormControlLabel value="8 GB" control={<Radio sx={{color: "white"}}/>} label="8 GB" />
                            <FormControlLabel value="16 GB" control={<Radio sx={{color: "white"}}/>} label="16 GB" />
                            <FormControlLabel value="32 GB" control={<Radio sx={{color: "white"}}/>} label="32 GB" />
                        </RadioGroup>
                    </FormControl>

                    <FormControl>
                        <FormLabel id="demo-radio-buttons-group-label" sx={{color: "white"}}>Tip :</FormLabel>

                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            name="radio-buttons-group"
                            value={filtrareTip}
                            onChange={event => handleFiltering(event, "tip")}
                            sx= {{color: "white"}}
                        >
                            <FormControlLabel value="DDR4" control={<Radio sx={{color: "white"}}/>} label="DDR4" />
                            <FormControlLabel value="DDR5" control={<Radio sx={{color: "white"}}/>} label="DDR5" />
                        </RadioGroup>
                    </FormControl>

                    <Button className='buton_add_cos' onClick={resetFilters} sx={{color: "white", backgroundColor: "red", borderRadius: "12px"}}>Reseteaza</Button>
                </div>

                <div className='rezultate'>
                    <div className='sortare_rams'>
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
                            RAMs.map((data) => RAMItem(data))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RAM;