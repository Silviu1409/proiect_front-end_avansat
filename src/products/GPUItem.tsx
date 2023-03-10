import { IGPU } from "../interfaces/IGPU";
import { Typography, Button } from '@mui/material';
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";

import "./GPUStil.scss";


const GPUItem = (item: IGPU)  => {
    const dispatch = useDispatch();

    const handleAddToCart = (item: IGPU) => {
        dispatch(addToCart(item));
    }
    
    return (
        <div key={item.id} className="item">
            <img src={item.url_poza} alt="gpu img"/>

            <Typography variant="h5" component="h5">
                {item.denumire}
            </Typography>

            <div>
                <Typography variant="h6" component="h6">
                    Chipset: {item.chipset}
                </Typography>

                <Typography variant="h6" component="h6">
                    model: {item.model}
                </Typography>

                <Typography variant="h6" component="h6">
                    Marime memorie: {item.size_memorie}
                </Typography>

                <Typography variant="h6" component="h6">
                    Tip memorie: {item.tip_memorie}
                </Typography>
            </div>

            <div>
                <Typography variant="h5" component="h5">
                    {item.pret.toString()} lei
                </Typography>

                <Button className='buton_add_cos' onClick={() => handleAddToCart(item)}>Adauga in cos</Button>
            </div>
        </div>
    )
}

export default GPUItem