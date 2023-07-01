import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";


function Step1({onStepComplete}){
    const dispatch = useDispatch();
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [title, setTitle] = useState("");
    const [apiKey, setApiKey] = useState("");
    const [errors, setErrors] = useState({})
    const [inputValue, setInputValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    const fetchSuggestions = async (input) => {
        const response = await fetch(`/api/auth/autocomplete/${input}`);
        const data = await response.json();
        setSuggestions(data);
    };

    useEffect(() => {
        if (inputValue) {
          fetchSuggestions(inputValue);
        } else {
          setSuggestions([]);
        }
    }, [inputValue]);


    const handleNext = () => {
        // When step is complete, we pass the data back to parent
        onStepComplete({ location, description, title });
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
        <div>
            <label>
                Location:
                <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                required
                />
                {suggestions.map((suggestion, index) => (
                    <div
                        key={index}
                        onMouseDown={() => {
                            setLocation(suggestion.description);
                            setInputValue(suggestion.description);
                            setSuggestions([]);
                        }}
                    >
                        {suggestion.description}
                    </div>
                ))}
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
