import { Typography, FormControl, Select, MenuItem, SelectChangeEvent, FormLabel, RadioGroup, FormControlLabel, Radio, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getSSDs, getSSDs_filter } from '../controllers/SSD_Controller';
import { ISSD } from '../interfaces/ISSD';
import SSDItem from './SSDItem';


import "./SSDStil.scss";


function SSD() {
    const [SSDs, setSSDs] = useState(Array<ISSD>);
    const [sort, setSort] = useState("");
    const [filtrareFormFactor, setFiltrareFormFactor] = useState("");


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

    const handleFiltering = (event: SelectChangeEvent, field: string) => {
        switch(field){
            case "form_factor": {
                setFiltrareFormFactor(event.target.value);
                break;
            }
            default: {
                break;
            }
        }

        getSSDs_filter(field, event.target.value)
        .then((data) => {
            setSSDs(data);
        });

        setSort("");
    }

    const resetFilters = () => {
        setFiltrareFormFactor("");

        getSSDs().then((data) => {
            setSSDs(data);
        });
    }

    useEffect(() =>{
        getSSDs().then((data) => {
            setSSDs(data);
        });
    }, []);


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
        </div>
    )
}

export default SSD;