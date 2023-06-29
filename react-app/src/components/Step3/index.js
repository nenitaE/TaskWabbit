import React from 'react';
import { useModal } from '../../context/Modal';
import { useState, useEffect } from "react";

function Step3({onStepComplete}){

    const { setModalContent, closeModal } = useModal();
    const [taskDate, setTaskDate] = useState("");

    const handleDateChange = (e) => {
        setTaskDate(e.target.value)
    }

    const onSubmit = () => {
        if(!taskDate){
            alert('Date field is required')
            return;
        }
        onStepComplete({'task_date': taskDate});
        closeModal();
    }

    const handleBack = () => {
        onStepComplete({ back: true });
    };

    // Set the modal content when this component mounts
  useEffect(() => {
    setModalContent(
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
    );
  }, [taskDate]);  // Dependency array includes taskDate to refresh modal content when taskDate changes

  return null;  // Return null because the actual content is rendered in the modal
}


export default Step3
