import React, { useEffect } from 'react';
import { getPSUs } from '../controllers/PSU_Controller';


function PSU() {
    useEffect(() =>{
        var psus = Promise.resolve(getPSUs());
        
        psus.then((value) =>{
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

export default PSU;