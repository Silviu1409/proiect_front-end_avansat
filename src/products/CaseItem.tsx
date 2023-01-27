import { ICase } from "../interfaces/ICase";
import { Typography, Button } from '@mui/material';

import "./CaseStil.scss";

var ATX: Map<boolean, string> = new Map([[true, "ATX"], [false, ""]]);

var mATX: Map<boolean, string> = new Map([[true, "mATX"], [false, ""]]);

var mITX: Map<boolean, string> = new Map([[true, "mITX"], [false, ""]]);

const CaseItem = (item: ICase)  => {
    return (
        <div key={item.id} className="item">
            <img src={item.url_poza} alt="case img"/>

            <Typography variant="h5" component="h5">
                {item.denumire}
            </Typography>

            <div>
                <Typography variant="h6" component="h6">
                    Dimensiuni: {item.dimensiuni}
                </Typography>

                <Typography variant="h6" component="h6">
                    Placi compatibile: { ATX.get(item.placi_compat.ATX) } { mATX.get(item.placi_compat.mATX) } { mITX.get(item.placi_compat.mITX) }
                </Typography>

                <Typography variant="h6" component="h6">
                    Ventilatoare incluse: {item.ventilatoare_incl}
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

export default CaseItem