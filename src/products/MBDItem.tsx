import { IMBD } from "../interfaces/IMBD";
import { Typography, Button } from '@mui/material';
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";

import "./MBDStil.scss";


const MBDItem = (item: IMBD)  => {
    const dispatch = useDispatch();

    const handleAddToCart = (item: IMBD) => {
        dispatch(addToCart(item));
    }

    return (
        <div key={item.id} className="item">
            <img src={item.url_poza} alt="mbd img"/>

            <Typography variant="h5" component="h5">
                {item.denumire}
            </Typography>

            <div>
                <Typography variant="h6" component="h6">
                    Soclu: {item.socket}
                </Typography>

                <Typography variant="h6" component="h6">
                    Tip memorie: {item.tip_memorie}
                </Typography>

                <Typography variant="h6" component="h6">
                    Sloturi memorie: {item.slots_memorie}
                </Typography>

                <Typography variant="h6" component="h6">
                    Capacitate maxima memorie: {item.max_memorie}
                </Typography>

                <Typography variant="h6" component="h6">
                    M.2: {item.M_2}
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

export default MBDItem