import { Typography, FormControl, Select, MenuItem, SelectChangeEvent, FormLabel, RadioGroup, FormControlLabel, Radio, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getGPUs, getGPUs_filter } from '../controllers/GPU_Controller';
import { IGPU } from '../interfaces/IGPU';
import GPUItem from './GPUItem';


import "./GPUStil.scss";


function GPU() {
    const [GPUs, setGPUs] = useState(Array<IGPU>);
    const [sort, setSort] = useState("");
    const [filtrareChipset, setFiltrareChipset] = useState("");
    const [filtrareMemorie, setFiltrareMemorie] = useState("");


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

    const handleFiltering = (event: SelectChangeEvent, field: string) => {
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

        getGPUs_filter(field, event.target.value)
        .then((data) => {
            setGPUs(data);
        });

        setSort("");
    }

    const resetFilters = () => {
        setFiltrareChipset("");
        setFiltrareMemorie("");

        getGPUs().then((data) => {
            setGPUs(data);
        });
    }

    useEffect(() =>{
        getGPUs().then((data) => {
            setGPUs(data);
        });
    }, []);


    return(
        <div className='pag_gpus'>
            <header className="pag_gpus-header">
                <Typography variant="h3" component="h3">
                    Procesoare
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
        </div>
    )
}

export default GPU;