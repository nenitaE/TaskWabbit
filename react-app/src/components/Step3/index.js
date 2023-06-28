import React from 'react';

function Step3({handleNext, handleBack, taskDate, setTaskDate}){
    const handleDateChange = (e) => {
        setTaskDate(e.target.value)
    }

    const onSubmit = () => {
        // if(!taskDate){
        //     alert('Date field is required')
        //     return;
        // }
        handleNext();
    }

    return(
        <div>
            <label>
                Choose the date for your task:
                <input
                    type="date"
                    value={taskDate}
                    onChange={handleDateChange}
                />
            </label>
            <button type="button" onClick={handleBack}>
                Back
            </button>
            <button onClick={onSubmit}>
                Next
            </button>
        </div>
    )
}

export default Step3
