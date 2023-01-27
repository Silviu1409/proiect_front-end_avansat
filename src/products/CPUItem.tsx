import { ICPU } from "../interfaces/ICPU";
import { Typography, Button } from '@mui/material';

import "./CaseStil.scss";


const CPUItem = (item: ICPU)  => {
    return (
        <div key={item.id} className="item">
            <img src={item.url_poza} alt="cpu img"/>

            <Typography variant="h5" component="h5">
                {item.denumire}
            </Typography>

            <div>
                <Typography variant="h6" component="h6">
                    Frecventa: {item.frecventa}
                </Typography>

                <Typography variant="h6" component="h6">
                    Grafica integrata: {item.grafica_integrata}
                </Typography>

                <Typography variant="h6" component="h6">
                    Nr. nuclee: {item.nr_nuclee}
                </Typography>

                <Typography variant="h6" component="h6">
                    Nr. threads: {item.nr_threads}
                </Typography>

                <Typography variant="h6" component="h6">
                    Producator: {item.producator}
                </Typography>

                <Typography variant="h6" component="h6">
                    Putere: {item.putere}
                </Typography>

                <Typography variant="h6" component="h6">
                    Serie: {item.serie}
                </Typography>

                <Typography variant="h6" component="h6">
                    Soclu: {item.socket}
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

export default CPUItem