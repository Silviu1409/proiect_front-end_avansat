import React, { useEffect } from 'react';
import { getCases } from '../controllers/Case_Controller';


function Case() {
    useEffect(() =>{
        var carcase = Promise.resolve(getCases());
        
        carcase.then((value) =>{
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

export default Case;