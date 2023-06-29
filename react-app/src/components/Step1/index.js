import React, { useState } from "react";

function Step1({location, setLocation, description, setDescription, handleNext, title, setTitle}){

    const [errors, setErrors] = useState({})

    const validate = () => {
        const newErrors = {};
        if (!location) newErrors.location = "Location is required";
        if (!description) newErrors.description = "Description is required";
        if (!title) newErrors.title = "Title is required";
        return newErrors;
    }

    const onNext = (e) => {
        e.preventDefault();
        // if(!location || description){
        //     alert('Both fields are required')
        //     return;
        // }
        const result = validate();
        if (Object.keys(result).length > 0){
            setErrors(result)
            return
        }
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
            {errors.location && <p>{errors.location}</p>}
            <label>
                Title:
                <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                />
            </label>
            {errors.title && <p>{errors.title}</p>}
            <label>
                Description:
                <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                />
            </label>
            {errors.description && <p>{errors.description}</p>}
            <button onClick={onNext}>Next</button>
        </div>
    )
}

export default Step1
