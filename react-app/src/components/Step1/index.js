import React, { useState, useEffect, useRef } from "react";
import './Step1.css';


function Step1({onStepComplete, existingData}){
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState(existingData.description || "");
    const [title, setTitle] = useState(existingData.title || "");
    const [errors, setErrors] = useState({})
    const [inputValue, setInputValue]  = useState(existingData.location || '');
    const [suggestions, setSuggestions] = useState([]);
    // const suggestionRef = useRef();
    // const [isInputSelected, setIsInputSelected] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [isLocationSelectedFromSuggestions, setLocationSelectedFromSuggestions] = useState(false);
    const [isInputChanged, setInputChanged] = useState(false);





    const fetchSuggestions = async (input) => {
        const response = await fetch(`/api/auth/autocomplete/${input}`);
        const data = await response.json();
        setSuggestions(data);
    };

    useEffect(() => {
        if(existingData.location) {
            setLocation(existingData.location);
            setLocationSelectedFromSuggestions(true); // If there's an existing location, it should be marked as selected
        }
    }, []);

    useEffect(() => {
        if (inputValue && isInputChanged) { // && !isInputSelected
          setLocationSelectedFromSuggestions(false);
          fetchSuggestions(inputValue);
        } else {
          setSuggestions([]);
        }
    }, [inputValue]); //isInputSelected


    const handleNext = () => {
        // When step is complete, we pass the data back to parent
        onStepComplete({ location, description, title });
      };

    const validate = () => {
        const newErrors = {};
        if (!location) newErrors.location = "Location is required";

        if (!description) {
            newErrors.description = "Description is required"
        } else if(description.length >= 500){
            newErrors.description = "Description is too long, limit 500 characters"
        }

        if (!title){
            newErrors.title = "Title is required";
        }else if(title.length >= 100) {
            newErrors.title = "Title is too long, limit 50 characters"
        }
        return newErrors;
        }

    const onNext = (e) => {
        e.preventDefault()
        const result = validate();
        if (Object.keys(result).length > 0){
            setErrors(result)
            return
        }
        if (!isLocationSelectedFromSuggestions) {
            setErrors({...result, location: "Please select a valid location from the suggestions."});
            return;
          }

        handleNext();
    }
    return (
        <>
        <div className="form-step1-description">
        <i class="fa-regular fa-pen-to-square"></i>
          <p className='step2-text'> Tell us about your task. We use these details to show Taskers in your area who fit your needs.</p>
        </div>
        <div className="step1">
            <div className="step1-section">
            <label>
                <h2>Your task Location</h2>
                <input
                className={errors.location && !inputValue ? 'error': ''}
                type="text"
                value={inputValue}
                maxLength={100}
                onChange={(e) => {
                    setInputValue(e.target.value)
                    setLocation(e.target.value);
                    setInputChanged(true);
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
                            setInputValue(suggestion.description);
                            setLocation(suggestion.description);
                            setSuggestions([]);
                            setShowSuggestions(false); // hide suggestions when a suggestion is clicked
                            setLocationSelectedFromSuggestions(true);
                            setInputChanged(false);
                            // clear the location error if any
                            if (errors.location) {
                                setErrors(prevErrors => {
                                    const newErrors = {...prevErrors};
                                    delete newErrors.location;
                                    return newErrors;
                                });
                            }
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
        </>
    )
}

export default Step1
