import React, { useEffect } from 'react';
import { getCases } from '../controllers/Case_Controller';

function Case() {
    useEffect(() => {
        getCases();
    });

    return(
        <div>
            
        </div>
    )
}

export default Case;