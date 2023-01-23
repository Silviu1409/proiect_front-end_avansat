import React, { useEffect } from 'react';
import { getMBDs } from '../controllers/MBD_Controller';


function MBD() {
    useEffect(() =>{
        var mbds = Promise.resolve(getMBDs());
        
        mbds.then((value) =>{
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

export default MBD;