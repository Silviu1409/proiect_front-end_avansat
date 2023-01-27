import { IPSU } from "../interfaces/IPSU";
import { Typography, Button } from '@mui/material';

import "./PSUStil.scss";


const PSUItem = (item: IPSU)  => {
    return (
        <div key={item.id} className="item">
            <img src={item.url_poza} alt="psu img"/>

            <Typography variant="h5" component="h5">
                {item.denumire}
            </Typography>

            <div>
                <Typography variant="h6" component="h6">
                    Certificare: {item.certificare}
                </Typography>

                <Typography variant="h6" component="h6">
                    Eficienta: {item.eficienta}
                </Typography>

                <Typography variant="h6" component="h6">
                    Modulara: {item.modulara}
                </Typography>

                <Typography variant="h6" component="h6">
                    Putere: {item.putere}
                </Typography>
            </div>

            <div>
                <Typography variant="h5" component="h5">
                    {item.pret.toString()} lei
                </Typography>

                <Button className='buton_add_cos' onClick={() => {}}>Adauga in cos</Button>
            </div>
        </div>
    )
}

export default PSUItem