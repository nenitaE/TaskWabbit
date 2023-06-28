import React from "react";

function Step1({location, setLocation, description, setDescription, handleNext, title, setTitle}){
    const onNext = (e) => {
        e.preventDefault();
        // if(!location || description){
        //     alert('Both fields are required')
        //     return;
        // }
        handleNext();
    }
    return (
        <div>
            <label>
                Location:
                <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
                />
            </label>
            <label>
                Title:
                <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                />
            </label>
            <label>
                Description:
                <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                />
            </label>
            <button onClick={onNext}>Next</button>
        </div>
    )
}

export default Step1
