import React from 'react';
import { useState } from 'react';

function Step2({handleNext, handleBack, taskers, setTaskerId}){

    const handleSelectTasker= (taskerId) => {
        setTaskerId(taskerId);
        handleNext()
    }

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
