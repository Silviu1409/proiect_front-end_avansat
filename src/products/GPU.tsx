import React, { useEffect } from 'react';
import { getGPUs } from '../controllers/GPU_Controller';


function GPU() {
    useEffect(() =>{
        var gpus = Promise.resolve(getGPUs());
        
        gpus.then((value) =>{
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

export default GPU;