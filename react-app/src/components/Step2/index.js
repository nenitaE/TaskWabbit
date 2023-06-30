import React from 'react';
import { useState } from 'react';
import { useModal } from '../../context/Modal';

function Step2({ onStepComplete, taskers}){
    const [taskerId, setTaskerId] = useState(null);

    const handleSelectTasker= (taskerId) => {
        setTaskerId(taskerId);
        onStepComplete({
            'tasker_id': taskerId,
        });
    }

    const handleBack = () => {
        onStepComplete({ back: true });
    };

    return (
        <div>
            <label>
                Choose your tasker:
                    {taskers && taskers.map((tasker) => (
                        <div key={tasker.id}>
                            <h2>{tasker.firstName}</h2>
                            <p>{tasker.taskerTaskTypes.hourlyRate}</p>
                            <button onClick={() => handleSelectTasker(tasker.id)}>Select and continue</button>
                        </div>
                    ))}
            </label>
            <button type="button" onClick={handleBack}>
                Back
            </button>

        </div>
    )
}

export default Step2
