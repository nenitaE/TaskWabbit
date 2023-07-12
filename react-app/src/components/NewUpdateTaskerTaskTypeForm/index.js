import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTaskerTaskType, getTaskerTaskTypes, updateTaskerTaskType  } from "../../store/taskerProfile";
import { useHistory, useParams } from "react-router-dom";


function NewUpdateTaskerTaskTypeForm() {
    const { taskerTaskTypeId } = useParams();
    console.log(taskerTaskTypeId, "*********taskerTaskType.Id in Update Form*********")

    //Get taskerTaskType by Id
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getTaskerTaskType(taskerTaskTypeId))
    }, [dispatch, taskerTaskTypeId]);

    const taskerProfile = useSelector((state) => state.taskerProfile.taskerTaskType);
    console.log("*********TASKERProfile IN UPDATE FORM", taskerProfile)

    // const taskerTaskTypes = Object.values(useSelector(state => state.taskerTaskTypes))
    // console.log(taskerTaskTypes, "******taskerTaskTypes********")
    // const taskType_id = taskerTaskType.taskType_id
    // console.log(taskType_id, "taskType_id*********")

    const tasker_id = useSelector((state) => state.session.user.id);

    const history = useHistory();

    const [hourlyRate, setHourlyRate] = useState(taskerProfile.hourlyRate);
    const [errors, setErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    const updateHourlyRate = (e) => setHourlyRate(e.target.value);


    const handleSubmit = async (e) => {
      console.log("Inside Handle SUbmit...EditTaskerTaskTypeForm component>>>>>>>>>>>>>>")

      e.preventDefault();
      setHasSubmitted(true);
      const existingData = {
          "tasker_id": tasker_id,
          "taskType_id": taskerProfile.taskType_id
      };
      console.log(existingData, "********existingData in handle submit")
      const taskerTaskTypeData = {
        hourlyRate
      }
      console.log(taskerTaskTypeData, "********EDITED***taskerTaskTypeData in handle submit")

      const finalTaskerTaskTypeData = {
        ...existingData,
        ...taskerTaskTypeData
      }
      console.log(finalTaskerTaskTypeData, "********finalTaskerTaskTypeData in handle submit")

      //dispatching edited data
      const editedTaskType = await dispatch(updateTaskerTaskType(taskerTaskTypeId, finalTaskerTaskTypeData));
      console.log(editedTaskType, "editedTaskerTaskType details in EditTaskerTaskTypeForm component----AFTER dispatching editTaskerTaskType");

      if (editedTaskType) {
          history.push(`/taskerTaskTypes/current`);
          dispatch(getTaskerTaskTypes());
      }

    };


    return (
      <div className='a'>
          <form className ='b' onSubmit={handleSubmit} >
              <ul>
              {Array.isArray(errors) ? errors.map((error, idx) => <li key={idx}>{error}</li>) : <li>{errors}</li>}
              </ul>

                      <h3>Use this form to edit the hourly rate for: .</h3>

                              <div className='d'>
                                  <label htmlFor='hourlyRate'>Enter an hourly rate in US dollars: </label>
                                      {hasSubmitted && !hourlyRate && (
                                          <label htmlFor='hourlyRate' className='e'>Hourly rate is required</label>
                                      )}
                                      <input
                                          type="number"
                                          placeholder="hourlyRate"
                                          required={true}
                                          value={hourlyRate}
                                          onChange={updateHourlyRate}
                                      />
                              </div>
                              <button type="submit">Update Hourly Rate</button>
          </form>
      </div>
  );


}

export default NewUpdateTaskerTaskTypeForm;
