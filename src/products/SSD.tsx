import React, { useEffect } from 'react';
import { getSSDs } from '../controllers/SSD_Controller';


function SSD() {
    useEffect(() =>{
        var ssds = Promise.resolve(getSSDs());
        
        ssds.then((value) =>{
            console.log(value);
            // value.forEach(elem => console.log(elem));
        }).catch((err) => {
            console.log(err);
        });
    });


    return(
        <div>
            
        </div>
    )
}

export default SSD;