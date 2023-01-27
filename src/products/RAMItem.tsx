import { IRAM } from "../interfaces/IRAM";
import { Typography, Button } from '@mui/material';

import "./RAMStil.scss";


const RAMItem = (item: IRAM)  => {
    return (
        <div key={item.id} className="item">
            <img src={item.url_poza} alt="ram img"/>

            <Typography variant="h5" component="h5">
                {item.denumire}
            </Typography>

            <div>
                <Typography variant="h6" component="h6">
                    Capacitate: {item.capacitate}
                </Typography>

                <Typography variant="h6" component="h6">
                    Frecventa: {item.frecventa}
                </Typography>

                <Typography variant="h6" component="h6">
                    Tip: {item.tip}
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

export default RAMItem