import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function Step5({handleSubmit}){
    const history = useHistory();

    const handleCofirm = async () => {
        handleSubmit()
        history.push('/tasks/current')
    }

    useEffect(() => {
      handleCofirm();
    }, [])

    return (
       <div>

       </div>
    )
}

export default Step5
