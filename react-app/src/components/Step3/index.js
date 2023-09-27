import React from 'react';
import { useState, useEffect } from "react";
import { useModal } from '../../context/Modal';
import "./Step3.css"

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

      let [year, month, day] = taskDate.split("-");
      let choosenDate = new Date(year, month-1, day);
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

    // Set modal content
  useEffect(() => {

    let isMounted = true;

    if (isMounted) {
        setClickOutsideModal(() => {});
        setModalContent(
        <div className='datemodal-container'>
          <div className='label-step3-container'>
          <h1 className='chose-date'>Choose your task date: </h1>
          </div>
          <div className='content-container'>
            <div className='input-container'>
            <input
                type="date"
                value={taskDate}
                onChange={handleDateChange}
              />
            </div>
            <div className='vertical-line' />
            <div className='confirm-details'>
              <i class="fa-regular fa-calendar"></i>
              <p>Next, confirm your details to get connected with your Tasker.</p>
            </div>
          </div>
          {error && <p className='error'>{error}</p>}
          <div className='button-container'>
          <button className="select-3-button "type="button" onClick={handleBack}>
            Back
          </button>
          <button className="select-3-button"onClick={onSubmit}>
            Next
          </button>
        </div>
        </div>
        );
      }
    return () => {
      if (isMounted) {
        closeModal();
        setClickOutsideModal(() => closeModal); // reset clickOutsideModal
      }
      isMounted = false;
    };
  }, [taskDate, error]);

  return null;  // Return null because the actual content is rendered in the modal
}


export default Step3
