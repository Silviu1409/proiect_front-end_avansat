import { Typography, FormControl, Select, MenuItem, SelectChangeEvent, FormLabel, RadioGroup, FormControlLabel, Radio, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getCPUs, getCPUs_filter } from '../controllers/CPU_Controller';
import { ICPU } from '../interfaces/ICPU';
import CPUItem from './CPUItem';


import "./CPUStil.scss";


function CPU() {
    const [CPUs, setCPUs] = useState(Array<ICPU>);
    const [sort, setSort] = useState("");
    const [filtrareProd, setFiltrareProd] = useState("");
    const [filtrareNuclee, setFiltrareNuclee] = useState(0);
    const [filtrareSocket, setFiltrareSocket] = useState("");


    const sorting = (sortare: string) => {
        switch(sortare){
            case "crescator": {
                CPUs.sort((a, b) => {return a.pret-b.pret});
                break;
            }
            case "descrescator": {
                CPUs.sort((a, b) => {return b.pret-a.pret});
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
            case "producator": {
                setFiltrareProd(event.target.value);
                setFiltrareNuclee(0);
                setFiltrareSocket("");
                break;
            }
            case "nr_nuclee": {
                setFiltrareNuclee(Number(event.target.value));
                setFiltrareProd("");
                setFiltrareSocket("");

                getCPUs_filter(field, Number(event.target.value))
                .then((data) => {
                    setCPUs(data);
                });

                setSort("");

                return;
            }
            case "socket": {
                setFiltrareSocket(event.target.value);
                setFiltrareProd("");
                setFiltrareNuclee(0);
                break;
            }
            default: {
                break;
            }
        }

        getCPUs_filter(field, event.target.value)
        .then((data) => {
            setCPUs(data);
        });

        setSort("");
    }

    const resetFilters = () => {
        setFiltrareProd("");
        setFiltrareNuclee(0);
        setFiltrareSocket("");

        getCPUs().then((data) => {
            setCPUs(data);
        });
    }

    useEffect(() =>{
        getCPUs().then((data) => {
            setCPUs(data);
        });
    }, []);


    return(
        <div className='pag_cpus'>
            <header className="pag_cpus-header">
                <Typography variant="h3" component="h3">
                    Procesoare
                </Typography>
            </header>

            <div className="pag_cpus-content">
                <div className='filtre_cpus'>
                    <Typography variant="h5" component="h5">
                        Filtrare produse
                    </Typography>

                    <FormControl>
                        <FormLabel id="demo-radio-buttons-group-label" sx={{color: "white"}}>Producator :</FormLabel>

                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            name="radio-buttons-group"
                            value={filtrareProd}
                            onChange={event => handleFiltering(event, "producator")}
                            sx= {{color: "white"}}
                        >
                            <FormControlLabel value="Intel" control={<Radio sx={{color: "white"}}/>} label="Intel" />
                            <FormControlLabel value="AMD" control={<Radio sx={{color: "white"}}/>} label="AMD" />
                        </RadioGroup>
                    </FormControl>

                    <FormControl>
                        <FormLabel id="demo-radio-buttons-group-label" sx={{color: "white"}}>Nuclee :</FormLabel>

                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            name="radio-buttons-group"
                            value={filtrareNuclee}
                            onChange={event => handleFiltering(event, "nr_nuclee")}
                            sx= {{color: "white"}}
                        >
                            <FormControlLabel value="4" control={<Radio sx={{color: "white"}}/>} label="4" />
                            <FormControlLabel value="6" control={<Radio sx={{color: "white"}}/>} label="6" />
                            <FormControlLabel value="8" control={<Radio sx={{color: "white"}}/>} label="8" />
                            <FormControlLabel value="12" control={<Radio sx={{color: "white"}}/>} label="12" />
                            <FormControlLabel value="14" control={<Radio sx={{color: "white"}}/>} label="14" />
                            <FormControlLabel value="16" control={<Radio sx={{color: "white"}}/>} label="16" />
                        </RadioGroup>
                    </FormControl>

                    <FormControl>
                        <FormLabel id="demo-radio-buttons-group-label" sx={{color: "white"}}>Socket :</FormLabel>

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

                    <Button className='buton_add_cos' onClick={resetFilters} sx={{color: "white", backgroundColor: "red", borderRadius: "12px"}}>Reseteaza</Button>
                </div>

                <div className='rezultate'>
                    <div className='sortare_cpus'>
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
                            CPUs.map((data) => CPUItem(data))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CPU;