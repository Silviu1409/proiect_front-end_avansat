import React, { useEffect } from 'react';
import { getCPUs } from '../controllers/CPU_Controller';


function CPU() {
    useEffect(() =>{
        var cpus = Promise.resolve(getCPUs());
        
        cpus.then((value) =>{
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

export default CPU;