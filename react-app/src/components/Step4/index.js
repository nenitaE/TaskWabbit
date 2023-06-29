import React from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function Step4({handleSubmit}){
    const history = useHistory();

    const handleCofirm = async(e) => {
        e.preventDefault();
        await handleSubmit(e);
        history.push('/tasks/current')
    }
    return (
        <div>
            <button type="button" onClick={handleCofirm}>Confirm & Chat</button>
        </div>
    )
}

export default Step4
