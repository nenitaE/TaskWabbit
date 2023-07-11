import React from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useEffect, useState} from "react";

function Step4({ handleSubmit, hourlyRate, location, taskDate, taskerName, trustAndSupportFee, setShouldSubmit}){
    const history = useHistory();
    // const trustAndSupportFee = 12.54;
    const totalRate = Number(hourlyRate) + Number(trustAndSupportFee);
    const [isConfirmed, setIsConfirmed] = useState(false);



    const handleCofirm = () => {
        handleSubmit()
        history.push('/tasks/current')
    }

    //HandleSubmit is called when isConfirmed is true
    useEffect(() => {
        if (isConfirmed) {
            handleSubmit();
            history.push('/tasks/current');
        }
    }, [isConfirmed]);

    return (
        <div>
            <p>{`Tasker Name: ${taskerName}`}</p>
            <p>{`Date: ${taskDate}`}</p>
            <p>{`Location: ${location}`}</p>
            <p>Price Details</p>
            <p>Hourly Rate {Number(hourlyRate)}/hr</p>
            <p>Trust and Support Fee {parseFloat(trustAndSupportFee).toFixed(2)}</p>
            <p>Total Price {totalRate.toFixed(2)}</p>
            {taskDate ?
              <button type="button" onClick={handleCofirm}>Confirm & Chat</button>
              :
              <p>Please go to Step 3 and add a date.</p>
            }
        </div>
    )
}

export default Step4
