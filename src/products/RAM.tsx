import React, { useEffect } from 'react';
import { getRAMs } from '../controllers/RAM_Controller';


function RAM() {
    useEffect(() =>{
        var rams = Promise.resolve(getRAMs());
        
        rams.then((value) =>{
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

export default RAM;