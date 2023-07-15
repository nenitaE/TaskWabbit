import React, { useState, useEffect, useRef } from "react";
import './Step1.css';


function Step1({onStepComplete, existingData}){
    const [location, setLocation] = useState(existingData.location || "");
    const [description, setDescription] = useState(existingData.description || "");
    const [title, setTitle] = useState(existingData.title || "");
    const [errors, setErrors] = useState({})
    const [inputValue, setInputValue]  = useState(existingData.location || '');
    const [suggestions, setSuggestions] = useState([]);
    const suggestionRef = useRef();
    // const [isInputSelected, setIsInputSelected] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);


    const fetchSuggestions = async (input) => {
        const response = await fetch(`/api/auth/autocomplete/${input}`);
        const data = await response.json();
        // console.log('Fetched suggestions:', data);
        setSuggestions(data);
    };

    useEffect(() => {
        // console.log('Input value:', inputValue);
        if (inputValue) { // && !isInputSelected
          fetchSuggestions(inputValue);
        } else {
          setSuggestions([]);
        }
    }, [inputValue]); //isInputSelected


    const handleNext = () => {
        // When step is complete, we pass the data back to parent
        const locationValue = suggestionRef.current || location;
        onStepComplete({ location: locationValue, description, title });
      };

    const validate = () => {
        const newErrors = {};
        if (!inputValue) newErrors.location = "Location is required";
        if (!description) newErrors.description = "Description is required";
        if (!title) newErrors.title = "Title is required";
        return newErrors;
    }

    const onNext = (e) => {
        const result = validate();
        if (Object.keys(result).length > 0){
            setErrors(result)
            return
        }
        handleNext();
    }
    return (
        <div className="step1">
            <div className="step1-section">
            <label>
                <h2>You task Location</h2>
                <input
                className={errors.location && !inputValue ? 'error': ''}
                type="text"
                value={inputValue}
                onChange={(e) => {
                    setInputValue(e.target.value)
                    setShowSuggestions(true); // show suggestions when user types
                }}
                placeholder="Street Address"
                required
                />
                <div className="location-suggestions">
                {showSuggestions && suggestions.map((suggestion, index) => (
                    <div
                        key={index}
                        onMouseDown={(e) => {
                            e.preventDefault()
                            // console.log('Clicked suggestion:', suggestion.description);
                            setInputValue(suggestion.description);
                            setLocation(inputValue);
                            // setIsInputSelected(true); //// Set isInputSelected to true when a suggestion is clicked
                            suggestionRef.current = suggestion.description;
                            setSuggestions([]);
                            setShowSuggestions(false); // hide suggestions when a suggestion is clicked
                        }}
                    >
                        {suggestion.description}
                    </div>
                ))}
                </div>
            </label>
            {errors.location && <p className="error">{errors.location}</p>}
            </div>

            <div className="step1-section">
            <label>
                <h2>Your task Title</h2>
                <input
                className={errors.title  && !title ? 'error': ''}
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Provide a title for your task"
                required
                />
            </label>
            {errors.title && <p className="error">{errors.title}</p>}
            </div>

            <div className="step1-section">
            <label>
                <h2>Tell us the details of your task</h2>
                <p>
                Start the conversation and tell your Tasker what you need done. This helps us show you only qualified and available Taskers for the job. Don't worry, you can edit this later.
                </p>
                <textarea
                className={errors.description  && !description ? 'error': ''}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Provide a summary of what you need done for your Tasker."
                required
                />
            </label>
            {errors.description && <p className="error">{errors.description}</p>}
            </div>
            <button onClick={onNext}>See Taskers & Prices</button>


        </div>
    )
}

export default Step1
