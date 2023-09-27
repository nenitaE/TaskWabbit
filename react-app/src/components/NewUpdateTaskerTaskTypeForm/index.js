import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTaskerTaskType, getTaskerTaskTypes, updateTaskerTaskType  } from "../../store/taskerProfile";
import { getTaskTypes } from "../../store/taskTypes";
import { useHistory, useParams } from "react-router-dom";
import './NewUpdateTaskerTaskType.css';

function NewUpdateTaskerTaskTypeForm() {
    const { taskerTaskTypeId } = useParams();
    
    //Get taskerTaskType by Id
    const dispatch = useDispatch();
    let hasErrors = false;

    useEffect(() => {
        dispatch(getTaskerTaskType(taskerTaskTypeId))
        dispatch(getTaskTypes())
    }, [dispatch, taskerTaskTypeId]);

    const taskerProfile = useSelector((state) => state.taskerProfile.taskerTaskType);
    
    const taskType_id = taskerProfile.taskType_id
    
    const taskTypes = useSelector(state => state.taskTypes);

    // flatten taskTypes into an obj with key of taskType.id
    const taskTypesById = {};
    taskTypes.forEach(taskType => {taskTypesById[taskType.id] = taskType})

    
    const tasker_id = useSelector((state) => state.session.user?.id);

    const history = useHistory();

    const [hourlyRate, setHourlyRate] = useState(taskerProfile.hourlyRate);
    const [rateError, setRateError] = useState('');
    const [hasSubmitted, setHasSubmitted] = useState(false);

    const updateHourlyRate = (e) => setHourlyRate(e.target.value);


    const handleSubmit = async (e) => {
      
      e.preventDefault();
      setHasSubmitted(true);
      const existingData = {
          "tasker_id": tasker_id,
          "taskType_id": taskerProfile.taskType_id
      };
      
      const taskerTaskTypeData = {
        hourlyRate
      }
      const finalTaskerTaskTypeData = {
        ...existingData,
        ...taskerTaskTypeData
      }
    // Set errors
      if (hourlyRate.length <= 0){
        setRateError('Must enter an hourly rate in USD to update');
        hasErrors = true;
      } else if (hourlyRate <= 0){
            setRateError('Must enter a minimum hourly rate of $1.');
            hasErrors = true;
      } else {
        setRateError('');
      }
    
      // Disable form submission if errors are present
      if (hasErrors) {
        return;
      }
    
      //dispatching edited data
      const editedTaskType = await dispatch(updateTaskerTaskType(taskerTaskTypeId, finalTaskerTaskTypeData));
      
      if (editedTaskType) {
        
        history.push(`/taskerTaskTypes/current`);
        dispatch(getTaskerTaskTypes());
      }

    };

    if (!tasker_id) {
      return(
          <div>
          <p>You must be logged in tasker to access this page</p>
          {history.push('/')}
          </div>
      )
    }


    return (
      <div className='update-tasktype-container'>
       
          <form className ='step1' onSubmit={handleSubmit} >      
                      <h3 className="form-edit-description">Use This Form To Edit Your Hourly Rate</h3>              
                      {/* <h3>Use this form to edit the hourly rate for: <span className="descriptionTT">{taskTypeDescription}.</span></h3>               */}
                              <div className='d'>
                                  <label htmlFor='hourlyRate'>Enter an hourly rate in US dollars: </label>
                                      
                                      <input 
                                          type="number"
                                          placeholder="hourlyRate"
                                          required={true}
                                          value={hourlyRate}
                                          onChange={updateHourlyRate}
                                      />
                              </div>
                              <div>
                                  <p className="field-error">
                                      {rateError &&   <span className="error"> 
                                                          <i className="fa-solid fa-triangle-exclamation"></i>
                                                          {rateError}
                                                      </span>}
                                  </p>
                              </div>
                              <button className="updateTTBtn" type="submit">Update Hourly Rate</button>
          </form>
      </div>
  );


}

export default NewUpdateTaskerTaskTypeForm;
