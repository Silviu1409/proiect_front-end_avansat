import { ISSD } from "../interfaces/ISSD";
import { Typography, Button } from '@mui/material';
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";

import "./SSDStil.scss";


const SSDItem = (item: ISSD)  => {
    const dispatch = useDispatch();

    const handleAddToCart = (item: ISSD) => {
        dispatch(addToCart(item));
    }

    return (
        <div key={item.id} className="item">
            <img src={item.url_poza} alt="ssd img"/>

            <Typography variant="h5" component="h5">
                {item.denumire}
            </Typography>

            <div>
                <Typography variant="h6" component="h6">
                    Capacitate: {item.capacitate}
                </Typography>

                <Typography variant="h6" component="h6">
                    Form factor: {item.form_factor}
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

export default SSDItem