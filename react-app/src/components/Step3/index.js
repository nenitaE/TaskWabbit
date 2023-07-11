import React from 'react';
import { useState, useEffect } from "react";
import { useModal } from '../../context/Modal';

function Step3({onStepComplete, existingData}){

    const { setModalContent, closeModal, setClickOutsideModal} = useModal();
    const [taskDate, setTaskDate] = useState(existingData.taskDate || "");
    const [error, setError] = useState("");

    const handleDateChange = (e) => {
        setTaskDate(e.target.value)
    }

    const validateDate = () => {
      let today = new Date()
      today.setHours(0, 0, 0, 0);

      let choosenDate = new Date(taskDate);
      choosenDate.setHours(0, 0, 0, 0)

      if(choosenDate < today){
        return 'Cannot schedule task in the past'
      }
      return "";
    }

    const onSubmit = () => {
      const dataError = validateDate();

        if(!taskDate){
           setError('Date field is required')
            return;
        }else if(dataError){
          setError(dataError)
          return;
        }

        onStepComplete({'task_date': taskDate});
        setError(""); //reset errors
        closeModal();
    }

    const handleBack = () => {
        onStepComplete({ back: true });
        closeModal();
    };

    // Set the modal content when this component mounts
  useEffect(() => {
    setClickOutsideModal(() => {});
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
        {error && <p>{error}</p>}
        <button type="button" onClick={handleBack}>
          Back
        </button>
        <button onClick={onSubmit}>
          Next
        </button>
      </div>
    );
    return () => {
      closeModal();
      setClickOutsideModal(() => closeModal); // reset clickOutsideModal
    }
  }, [taskDate, error]);  // Dependency array includes taskDate to refresh modal content when taskDate changes

  return null;  // Return null because the actual content is rendered in the modal
}


export default Step3
