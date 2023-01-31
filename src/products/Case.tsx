import { Typography, FormControl, Select, MenuItem, SelectChangeEvent, FormLabel, RadioGroup, FormControlLabel, Radio, Button, Fab } from '@mui/material';
import { useEffect, useState } from 'react';
import { ICase } from '../interfaces/ICase';
import CaseItem from './CaseItem';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { NavLink } from 'react-router-dom';
import { useGetAllCasesQuery, useGetCases_placa_compatMutation } from '../store/caseApi';

import "./Stil.scss";
import "./CaseStil.scss";


function Case() {
    const {data, isLoading} = useGetAllCasesQuery();
    const [getCases_placa_compat] = useGetCases_placa_compatMutation();
    const [carcase, setCarcase] = useState(Array<ICase>);
    const [sort, setSort] = useState("");
    const [filtrare, setFiltrare] = useState("");


    const sorting = (sortare: string) => {
        switch(sortare){
            case "crescator": {
                carcase.sort((a, b) => {return a.pret-b.pret});
                break;
            }
            case "descrescator": {
                carcase.sort((a, b) => {return b.pret-a.pret});
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

    const handleFiltering = async (event: SelectChangeEvent) => {
        setFiltrare(event.target.value);

        const res = await getCases_placa_compat(event.target.value).unwrap();

        if(res){
            setCarcase([...res]);
        }

        setSort("");
    }

    const resetFilters = () => {
        setFiltrare("");

        if(data)
            setCarcase([...data]);
    }

    useEffect(() =>{
        if(isLoading){
            return;
        }
        else if(data){
            setCarcase([...data]);
        } else {
            setCarcase([]);
        }
    }, [isLoading, data]);


    return(
        <div className='pag_carcase'>
            <header className="pag_carcase-header">
                <Typography variant="h3" component="h3">
                    Carcase
                </Typography>
            </header>

            <div className="pag_carcase-content">
                <div className='filtre_carcase'>
                    <Typography variant="h5" component="h5">
                        Filtrare produse
                    </Typography>

                    <FormControl>
                        <FormLabel id="demo-radio-buttons-group-label" sx={{color: "white"}}>Placa compatibila :</FormLabel>

                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            name="radio-buttons-group"
                            value={filtrare}
                            onChange={handleFiltering}
                            sx= {{color: "white"}}
                        >
                            <FormControlLabel value="ATX" control={<Radio sx={{color: "white"}}/>} label="ATX" />
                            <FormControlLabel value="mATX" control={<Radio sx={{color: "white"}}/>} label="mATX" />
                            <FormControlLabel value="mITX" control={<Radio sx={{color: "white"}}/>} label="mITX" />
                        </RadioGroup>
                    </FormControl>

                    <Button className='buton_add_cos' onClick={resetFilters} sx={{color: "white", backgroundColor: "red", borderRadius: "12px"}}>Reseteaza</Button>
                </div>

                <div className='rezultate'>
                    <div className='sortare_carcase'>
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
                            carcase.map((data) => CaseItem(data))
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

export default Case;