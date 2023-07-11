import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getTaskerTaskTypes, updateTaskerTaskType } from "../../store/taskerProfile";
import { getTaskTypes } from "../../store/taskTypes";

function EditTaskerTaskTypeForm({taskerTaskType, formType}) {

    const { taskerTaskTypeId } = useParams();
    const tasker_id = useSelector((state) => state.session.user.id);
    const taskTypes = useSelector((state) => state.taskTypes);

    const history = useHistory();

    const [hourlyRate, setHourlyRate] = useState(taskerTaskType.hourlyRate);
    const [errors, setErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    const dispatch = useDispatch();

    const updateHourlyRate = (e) => setHourlyRate(e.target.value);

    useEffect(() => {
        dispatch(getTaskTypes())
    }, [dispatch])

    const handleSubmit = async (e) => {

        e.preventDefault();
        setHasSubmitted(true);
        const existingData = {
            "tasker_id": tasker_id,
            "taskType_id": taskerTaskType.taskerTaskType.taskType_id,
        };

        const taskerTaskTypeData = {
          "hourlyRate": parseInt(hourlyRate)
        }

        const finalTaskerTaskTypeData = {
          ...existingData,
          ...taskerTaskTypeData
        }

        let data;
        data = await dispatch(updateTaskerTaskType(taskerTaskTypeId, finalTaskerTaskTypeData));


        if (data && data.length > 0) {
          setErrors(data);
        } else {
            history.push(`/taskerTaskTypes/current`);
            dispatch(getTaskerTaskTypes(taskerTaskTypeId));
        }

    };

    return (
        <div className='a'>
            <form className ='b' onSubmit={handleSubmit} >
                <ul>
                {Array.isArray(errors) ? errors.map((error, idx) => <li key={idx}>{error}</li>) : <li>{errors}</li>}
                </ul>
                    <h2>{formType}</h2>
                        <h3>Use this form to edit the hourly rate for: .</h3>
                            {/* <div className='c'>
                                <label htmlFor='taskType_id'>Task Type </label>
                                    {hasSubmitted && !taskType_id && (
                                        <label htmlFor='taskType_id' className='field-error'>Task type is required</label>
                                    )}
                                    <select
                                        id="taskType_id"
                                        onChange={updateTaskType_id}
                                        required={true}
                                    >
                                        <option value={1}>General Mounting</option>
                                        <option value={2}>Minor Home Repairs</option>
                                        <option value={3}>Cleaning</option>
                                        <option value={4}>Yardwork</option>
                                        <option value={5}>Plumbing Help</option>
                                        <option value={6}>Indoor Painting</option>
                                        <option value={7}>Heavy Lifting and Loading</option>
                                        <option value={8}>Waiting in Line</option>
                                        <option value={9}>Pet Sitting</option>
                                        <option value={10}>Cooking/Baking</option>
                                    </select>
                            </div> */}
                                <div className='d'>
                                    <label htmlFor='hourlyRate'>Enter an hourly rate in US dollars: </label>
                                        {hasSubmitted && !hourlyRate && (
                                            <label htmlFor='hourlyRate' className='e'>Hourly rate is required</label>
                                        )}
                                        <input
                                            type="number"
                                            placeholder={hourlyRate}
                                            required={true}
                                            value={hourlyRate}
                                            onChange={updateHourlyRate}
                                        />
                                </div>
                                <input type="submit" value={formType} />
            </form>
        </div>
    );


}

export default EditTaskerTaskTypeForm
